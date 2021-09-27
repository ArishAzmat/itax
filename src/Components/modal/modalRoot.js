import React from 'react';

export default function ModalRoot({isOpen,body,title}) {

 

  return (
    <section >
        <div
          className="modal fade in"
          id="apply_modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={isOpen ?  {display: "block"} : {display: "none"} }
        >
          <div className="modal-dialog custom-modal" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">{title}</h4>
              </div>

        <div className="modal-body">
        {body}
          </div>
            
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade in" style={{ display: "none" }}></div>
     
      
    </section>
  );
}