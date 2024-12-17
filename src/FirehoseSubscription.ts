import {
  OutputSchema as RepoEvent,
  isCommit,
} from './lexicon/types/com/atproto/sync/subscribeRepos'
import { isAboutScala } from './scala';
import { FirehoseSubscriptionBase, getOpsByType } from './util/subscription'


export class FirehoseSubscription extends FirehoseSubscriptionBase {
  async handleEvent(evt: RepoEvent) {
    if (!isCommit(evt)) return


    const ops = await getOpsByType(evt)

    if (process.env["DEBUG"]) {
      // use only for debug purposes
      for (const post of ops.posts.creates) {
        console.log("================== [NEW POST] ==================")
        console.log(post.author)
        console.log(post.record.text)
        console.log("================== [END POST] ==================")
      }
    }

    const postsToDelete = ops.posts.deletes.map((del) => del.uri)
    const postsToCreate = ops.posts.creates
      .filter((create) => {
        // only scala related posts
        return isAboutScala(create.author, create.record.text);
      })
      .map((create) => {
        // map scala related posts to a db row
        console.info("Found suitable message: ", create.record.text)
        return {
          uri: create.uri,
          cid: create.cid,
          indexedAt: new Date().toISOString(),
        }
      })

    if (postsToDelete.length > 0) {
      await this.db
        .deleteFrom('post')
        .where('uri', 'in', postsToDelete)
        .execute()
    }
    if (postsToCreate.length > 0) {
      await this.db
        .insertInto('post')
        .values(postsToCreate)
        .onConflict((oc) => oc.doNothing())
        .execute()
    }
  }
}
