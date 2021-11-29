import React, { useRef } from "react";
import jsPDF from 'jspdf'
import html2canvas from "html2canvas";

function CaseLawModal(props) {
  const myref  = useRef()
const printDocument = () =>{
  
  var HTML_Width = document.getElementById('HTMLtoPDF').offsetWidth;
  // console.log('HTML_Width',HTML_Width)
  var HTML_Height = document.getElementById('HTMLtoPDF').offsetHeight;
  // console.log('HTML_Width',HTML_Height)
  var top_left_margin = 20;
  var PDF_Width = HTML_Width+(top_left_margin*2);
  var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;

  var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;

console.log("test here",document.getElementById('HTMLtoPDF'))
  html2canvas(document.getElementById('HTMLtoPDF'),{allowTaint:true}).then(function(canvas) {
    console.log("then=>")
    canvas.getContext('2d');

    console.log(canvas.height+"  "+canvas.width);




    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);

    console.log("totalPDFPages",totalPDFPages)
    for (var i = 1; i <= totalPDFPages; i++) { 
      // pdf.text('Page ' + String(i) + ' of ' + String(totalPDFPages), pdf.internal.pageSize.width -100, pdf.internal.pageSize.height - 20, {
      //   align: 'center'
      // })
      pdf.addPage();
      pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);

    }

      pdf.save(`${props.content.case_name}.pdf`);
      });
  // const input = document.getElementById('HTMLtoPDF');
  // html2canvas(input)
  //   .then((canvas) => {
  //     let imgWidth = 200;
  //     let imgHeight = canvas.height * imgWidth / canvas.width;
  //     const imgData = canvas.toDataURL('img/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //     // pdf.output('dataurlnewwindow');
  //     pdf.save(`${props.title}.pdf`);
  //   });
}


  return (
    <div>
      <a onClick={()=>printDocument()} id="divToPrint" style={{ float: "right" }} class="btn button">
            Download Pdf
          </a>
      <div ref={myref} id="HTMLtoPDF" className="download-pdf">
        <p className="case-modal citation">{props.content.citation}</p>
        <p className="case-modal case-name">{props.content.case_name}</p>
        <p className="case-modal court-name">{props.content.court_name}</p>
        <p className="case-modal case-number">{props.content.case_number}</p>
  
          <div className="row">
          <div className="col-md-5 txt-center"> <span className="case-modal ">Appeal Filed on </span>{props.content.appeal_filing_date}</div> 
          <div className="col-md-2"></div>
          <div className="col-md-5 txt-center"> <span className="case-modal ">Date of Judgment </span> {props.content.date_of_order}</div>
        </div>
        <p className="case-modal case-name">{props.content.in_favour_of}</p>
      
        <br/>
        <h3 class="head-note">Head Note</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: props.content.gist,
          }}
        />
         <div
          dangerouslySetInnerHTML={{
            __html: props.content.judgment,
          }}
        />
      </div>
    </div>
  );
}

export default CaseLawModal;
