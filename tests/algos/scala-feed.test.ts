import { scalaRelatedOrganizationProfiles } from '../../src/scala/accounts';
import { isAboutScala } from '../../src/scala/index';

const randomAuthorDid = "did:plc:abcde12345"

describe('testing isAboutScala', () => {
  test('the #Scala hashtag should be picked up', () => {
    expect(
      isAboutScala(randomAuthorDid, "#Scala")
    ).toBe(true);
  });
  test('proper message should be qualified as Scala related', () => {
    expect(
      isAboutScala(randomAuthorDid, "We've a full house at the #London #Scala OSS Hack night this Wednesday! www.meetup.com/london-scala...")
    ).toBe(true);
  });
  test('post by scala related org account should be qualified as Scala related', () => {
    expect(
      isAboutScala(scalaRelatedOrganizationProfiles[0], "This one doesn't have a hashtag")
    ).toBe(true);
  });
  test('empty message should not be qualified as Scala', () => {
    expect(
      isAboutScala(randomAuthorDid, "")
    ).toBe(false);
  });
});
