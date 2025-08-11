import { createClient } from 'contentful'
import { parseModelsEntries, parsePaginatedEntries } from './common/parsers';
import Singleton from './abstracts/Singleton';

export default class BaseRepository extends Singleton {
  cdaClient
  cpaClient
  contentType
  defaultOrder
  constructor(
    {
      CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN,
      CONTENTFUL_PREVIEW_ACCESS_TOKEN = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
      CONTENTFUL_ENV = process.env.CONTENTFUL_ENV,
    } = process.env
  ) {
    super()
    if (CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN) {
      this.cdaClient = createClient({
        host: 'cdn.contentful.com',
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        environment: CONTENTFUL_ENV,
      })
    }
    if (CONTENTFUL_SPACE_ID && CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
      this.cpaClient = createClient({
        host: 'preview.contentful.com',
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
        environment: CONTENTFUL_ENV,
      })
    }
  }
  getContentType() {
    return this.constructor.contentType
  }
  getClient(preview = false) {
    return preview ? this.cpaClient : this.cdaClient
  }
  async getBySlug(slug, options = {}, preview = false) {
    return this.getModel(
      {
        'fields.slug': slug,
        ...options,
      },
      preview
    )
  }
  async getModel(options = {}, preview = false) {
    const entries = await this.getModels(
      {
        ...options,
        limit: 1,
      },
      preview
    )
    return entries[0]
  }
  async getModels(options = {}, preview = false) {
    const entries = await this.getClient(preview).getEntries({
      content_type: this.getContentType(),
      order: this.defaultOrder,
      ...options,
    })
    return parseModelsEntries(entries)
  }
  async getModelsWithPaginate(options = {}, pageData, preview = false) {
    const { page = 1, postsPerPage = options.limit || 10 } = pageData || {}
    const entries = await this.getClient(preview).getEntries({
      content_type: this.getContentType(),
      limit: postsPerPage,
      skip: postsPerPage * (page - 1),
      order: this.defaultOrder,
      ...options,
    })
    return parsePaginatedEntries(entries, page)
  }
}
