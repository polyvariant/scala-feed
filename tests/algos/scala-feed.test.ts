import { isAboutScala } from '../../src/scala/index';

describe('testing isAboutScala', () => {
  test('the #Scala hashtag should be picked up', () => {
    expect(
      isAboutScala("#Scala")
    ).toBe(true);
  });
  test('proper message should be qualified as Scala related', () => {
    expect(
      isAboutScala("We've a full house at the #London #Scala OSS Hack night this Wednesday! www.meetup.com/london-scala...")
    ).toBe(true);
  });
  test('empty message should not be qualified as Scala', () => {
    expect(
      isAboutScala("")
    ).toBe(false);
  });
});
