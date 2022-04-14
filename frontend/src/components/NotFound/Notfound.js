import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
   <div className="row">
      <div className="col-md-12">
         <div className="error-template text-center">
            <h1 className='mt-5'>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details mb-5">Sorry, an error has occured, Requested page not found!</div>
            <div className="error-actions">
               <Link className="btn btn-primary btn-lg me-5" to="/">Take Me Home</Link>
               <Link className="btn btn-outline-primary btn-lg" to="/tasks">View Tasks</Link>
            </div>
         </div>
      </div>
   </div>
);

export default NotFoundPage;
