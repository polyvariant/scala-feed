const scalalang = [
  "scala", "scala3", "dotty"
]

const typelevel = [
  "cats-effect"
]

const scalameta = [
  "munit", "scalameta", "scalafmt",
  //  "mdoc"
]

const softwaremill = [
  "scalar", "scalarconf"
]

const sbt = [
  "sbt"
]

const lihaoi = [
  "os-lib", "requests-scala"
]

const lightbend = [
  "akka", "playframework"
]

const others = [
  "pekko"
]

const allHashTags =
  scalalang.concat(typelevel,
    scalameta,
    softwaremill,
    // sbt,    // sbt seems to be a thing in TV in Brasil
    // lihaoi, // apparently people like to discuss hardware mills a lot
    lightbend,
    others
  ).map(w => hashTag(w))

function hashTag(word: String) {
  return `#${word}`
}

export function isAboutScala(text: string): boolean {
  const input = text.toLowerCase();
  const textWords = input.split(/\s+/);
  return allHashTags.map(v => v.toLowerCase()).some(tag => textWords.includes(tag));
}

