class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        let keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: 'i',
                  },
              }
            : {};

        this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryStrCopy = { ...this.queryStr };

        // Removing fields from query
        const removeFields = ['keyword', 'limit', 'page', 'sort'];
        removeFields.forEach((field) => delete queryStrCopy[field]);

        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        this.query.find(JSON.parse(queryStr));

        // Sorting logic
    if (this.queryStr.sort) {
        const sortBy = this.queryStr.sort === 'asc' ? 'price' : '-price';
        this.query = this.query.sort(sortBy);
    }

        return this;
    }

    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort === 'desc' ? '-price' : 'price';
            this.query = this.query.sort(sortBy);
        }
        return this;
    }

    paginate(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;
