import { describe, expect, it } from 'vitest'
import profile from '../data/profile.json'
import projects from '../data/projects.json'

describe('a11y — image alt text in data files', () => {
  it('every project image has non-empty alt text', () => {
    for (const project of projects) {
      for (const img of project.images) {
        expect(
          img.alt,
          `Project "${project.name}" image missing alt text`,
        ).toBeTruthy()
      }
    }
  })

  it('every project has a name for accessible labelling', () => {
    for (const project of projects) {
      expect(project.name).toBeTruthy()
    }
  })
})

describe('a11y — interactive element labels in profile data', () => {
  it('every social link has a platform label (used as aria-label)', () => {
    for (const social of profile.socials) {
      expect(
        social.platform,
        'Social entry missing platform label',
      ).toBeTruthy()
    }
  })

  it('profile has a name field for page title and headings', () => {
    expect(profile.name).toBeTruthy()
    expect(profile.headline).toBeTruthy()
  })
})
