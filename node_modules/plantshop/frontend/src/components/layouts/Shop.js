import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import Product from '../product/Product';
import Pagination from 'react-js-pagination';
import Loader from './Loader';
import MetaData from './MetaData';
import { toast } from 'react-toastify';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import { useParams } from "react-router-dom";

export default function Shop() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Temp states for filters to apply on button click
  const [tempPrice, setTempPrice] = useState(price);
  const [tempCategory, setTempCategory] = useState(category);
  const [tempRating, setTempRating] = useState(rating);
  const [tempSortBy, setTempSortBy] = useState(sortBy);

  const { keyword } = useParams();
  const categories = ['Plants', 'Plant Care', 'House Shape Plant', 'Office Plant', 'Hanging Planter', 'Ceramic Pot and Plant'];

  const setCurrentPageNo = (pageNo) => setCurrentPage(pageNo);

  const applyFilters = () => {
      setPrice(tempPrice);
      setCategory(tempCategory);
      setRating(tempRating);
      setSortBy(tempSortBy);
      setCurrentPage(1); // Reset to the first page after applying filters
  };

  const resetFilters = () => {
      // Reset temp states
      setTempPrice([1, 1000]);
      setTempCategory(null);
      setTempRating(0);
      setTempSortBy("");
      
      // Reset actual states
      setPrice([1, 1000]);
      setCategory(null);
      setRating(0);
      setSortBy("");
      setCurrentPage(1);
  };

  useEffect(() => {
      if (error) {
          return toast.error(error, {
              position: toast.POSITION.BOTTOM_CENTER,
          });
      }
      dispatch(getProducts(keyword||"", price, category, rating, currentPage, sortBy));
  }, [error, dispatch, currentPage, keyword, price, category, rating, sortBy]);

  return (
      <Fragment>
          {loading ? (
              <Loader />
          ) : (
              <Fragment>
                  <MetaData title={"Buy Best Products"} />
                  <h1 id="products_heading">Latest Products</h1>
                  <button
                      className="btn btn-primary mb-3"
                      onClick={() => setShowFilters(!showFilters)}
                  >
                      {showFilters ? "Hide Filters" : "Show Filters"}
                  </button>
                  <section id="products" className="container mt-5">
                      <div className="row">
                          {showFilters && (
                              <div className="col-6 col-md-3 mb-5 mt-5">
                                  {/* Price Filter */}
                                  <div className="px-5">
                                      <Slider
                                          range={true}
                                          marks={{
                                              1: "د.إ1",
                                              1000: "د.إ1000",
                                          }}
                                          min={1}
                                          max={1000}
                                          defaultValue={tempPrice}
                                          value={tempPrice}
                                          onChange={(price) => {
                                              setTempPrice(price);
                                          }}
                                          handleRender={(renderProps) => (
                                              <Tooltip
                                                  overlay={`$${renderProps.props["aria-valuenow"]}`}
                                              >
                                                  <div {...renderProps.props}></div>
                                              </Tooltip>
                                          )}
                                      />
                                  </div>
                                  <hr className="my-5" />
                                  {/* Category Filter */}
                                  <div className="mt-5">
                                      <h3 className="mb-3">Categories</h3>
                                      <ul className="pl-0">
                                          {categories.map((cat) => (
                                              <li
                                                  style={{
                                                      cursor: "pointer",
                                                      listStyleType: "none",
                                                  }}
                                                  key={cat}
                                                  onClick={() => setTempCategory(cat)}
                                                  className={tempCategory === cat ? "text-primary" : ""}
                                              >
                                                  {cat}
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                                  <hr className="my-5" />
                                  {/* Ratings Filter */}
                                  <div className="mt-5">
                                      <h4 className="mb-3">Ratings</h4>
                                      <ul className="pl-0">
                                          {[5, 4, 3, 2, 1].map((star) => (
                                              <li
                                                  style={{
                                                      cursor: "pointer",
                                                      listStyleType: "none",
                                                  }}
                                                  key={star}
                                                  onClick={() => setTempRating(star)}
                                                  className={tempRating === star ? "text-primary" : ""}
                                              >
                                                  <div className="rating-outer">
                                                      <div
                                                          className="rating-inner"
                                                          style={{
                                                              width: `${star * 20}%`,
                                                          }}
                                                      ></div>
                                                  </div>
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                                  <hr className="my-5" />
                                  {/* Sort by Price */}
                                  <div className="mt-5">
                                      <h4 className="mb-3">Sort By Price</h4>
                                      <select
                                          className="form-select"
                                          value={tempSortBy}
                                          onChange={(e) => setTempSortBy(e.target.value)}
                                      >
                                          <option value="asc">Price: Low to High</option>
                                          <option value="desc">Price: High to Low</option>
                                      </select>
                                  </div>
                                  <hr className="my-5" />
                                  {/* Filter Buttons */}
                                  <div className="d-grid gap-2">
                                      <button
                                          className="btn btn-success"
                                          onClick={applyFilters}
                                      >
                                          Apply Filters
                                      </button>
                                      <button
                                          className="btn btn-secondary"
                                          onClick={resetFilters}
                                      >
                                          Reset Filters
                                      </button>
                                  </div>
                              </div>
                          )}
                          <div className={showFilters ? "col-6 col-md-9" : "col-12"}>
                              <div className="row">
                                  {products &&
                                      products.map((product) => (
                                          <Product col={4} key={product._id} product={product} />
                                      ))}
                              </div>
                          </div>
                      </div>
                  </section>
                  {productsCount > 0 && productsCount > resPerPage ? (
                      <div className="d-flex justify-content-center mt-5">
                          <Pagination
                              activePage={currentPage}
                              onChange={setCurrentPageNo}
                              totalItemsCount={productsCount}
                              itemsCountPerPage={resPerPage}
                              nextPageText={"Next"}
                              firstPageText={"First"}
                              lastPageText={"Last"}
                              itemClass={"page-item"}
                              linkClass={"page-link"}
                          />
                      </div>
                  ) : null}
              </Fragment>
          )}
      </Fragment>
  );
}