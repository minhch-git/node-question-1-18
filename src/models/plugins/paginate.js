const paginate = schema => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.select] - Select fields. Multiple select criteria should be separated by commas (,)
   * @param {string} [options.sort] - Sorting criteria. Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */

  schema.statics.paginate = async function (filter, options) {
    // Create filter string
    const filterStr = JSON.stringify(filter)

    // Create operators ($gt, $gte, etc)
    filter = JSON.parse(
      filterStr.replace(/\b(gt|gte|lt|lte|in|eq)\b/g, match => `$${match}`)
    )

    // Finding resource
    let query = this.find(filter)

    // Select Fields
    if (options.select) {
      const fields = options.select.split(',').join(' ')
      query = query.select(fields)
    }

    // Sort
    if (options.sort) {
      const sortBy = options.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    // Pagination
    const page = parseInt(options.page, 10) || 1
    const limit = parseInt(options.limit, 10) || 10
    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit)

    // Populate data fields.
    if (options.populate) {
      options.populate.split(',').forEach(populateOption => {
        query = query.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        )
      })
    }

    // Executing query
    const countPromise = this.countDocuments(filter).exec()
    const docsPromise = query.exec()
    const [totalResults, results] = await Promise.all([
      countPromise,
      docsPromise,
    ])

    return {
      success: true,
      data: results,
      page,
      limit,
      totalResults,
      totalPages: Math.ceil(totalResults / limit),
    }
  }
}

export default paginate
