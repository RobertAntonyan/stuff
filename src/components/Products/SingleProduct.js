import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../feauters/api/apiSlice";
import ROUTES from "../../utils/routes";
import Product from "./Product";
import  Products  from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProducts } from "../../feauters/products/productsSlice";
function SingleProduct() {
  const { id } = useParams();
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {related, list} = useSelector(({products}) => products)
  useEffect(() => {
    if (!isLoading && !isFetching && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if(!data || !list.length) return;
    if (data) {
      dispatch(getRelatedProducts(data.category.id));
    }
  }, [data, list.length]);

  return !data ? (
    <section className="presloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products"/>
    </>
  );
}

export default SingleProduct;
