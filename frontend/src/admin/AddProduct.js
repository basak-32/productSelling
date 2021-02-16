import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';

import { createProduct, getAllCategories } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper/index';

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    inStock: '',
    size: '',
    photo: '',
    categories: [],
    category: '',
    loading: false,
    error: '',
    createdProduct: '',
    getARedirect: false,
    formData: ''
  });

  const { 
    name, 
    description, 
    price, 
    inStock, 
    size,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getARedirect,
    formData
  } = values;

  const preload = () => {
    getAllCategories().then(data => {
      console.log(data);
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({...values, categories: data, formData: new FormData()});
        console.log(categories);
      }
    })
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value});
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error: '', loading: true});

    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          photo: '',
          inStock: '',
          size: '',
          loading: false,
          createdProduct: data.name
        })
      }
    })
  };

  const successMessage = () => (
    <div 
      className='alert alert-success mt-3'
      style={{display: createdProduct ? '' : 'none'}}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const errorMessage = () => (
    <div 
      className='alert alert-warning mt-3'
      style={{display: error ? '' : 'none'}}
    >
      <h4>Product creation failed!!</h4>
    </div>
  );

  const createProductForm = () => (
    <form >
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))
          }
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("inStock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={inStock}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("size")}
          type="string"
          className="form-control"
          placeholder="Available sizes"
          value={size}
        />
      </div>
      
      <button type="submit" onClick={onSubmit} className="btn btn-outline-success my-3">
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title='Add a Product here'
      description='Welcome to Product Creation section'
      className='container bg-info p-4'
    >
      <Link to='/admin/dashboard' className='btn btn-md btn-dark mb-3'>Admin Home</Link>
      <div className='row bg-dark text-white rounded'>
        <div className='col-md-8 offset-md-2'>
          {createProductForm()}
          {successMessage()}
        </div>
      </div>
    </Base>
  )
};

export default AddProduct;