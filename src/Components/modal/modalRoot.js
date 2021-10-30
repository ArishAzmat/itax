import React, { useEffect } from 'react';

export default function ModalRoot({isOpen,body,title,close,width}) {
  useEffect(()=> {
    if(isOpen){
      document.body.classList.add("modal-open");  
    }
    else{
      document.body.classList.remove("modal-open");  
      // console.log("remopve")
    }
  },[isOpen])
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
          <div className="modal-dialog custom-modal"  style={{width:width?.length > 0? width :'44.5%'}} role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={() => close(false)} data-dismiss="modal">
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