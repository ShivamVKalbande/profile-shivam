import React from 'react';
import './Modal.css';
import { Link, useNavigate  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPrint, faShare, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/img/logo.png';

function Estimate_view() {
  return (
    <div className="containera">
      <div className="header">
        {/* <button className="btn back">←</button> */}
        <Link to="/estimate" style={{ textDecoration: "none" }}>
          <div className="inesarrob">
            <span style={{ fontSize: "30px" }}>&#8592;</span>
          </div>
        </Link>
        <h5 className='headingb'>Estimate</h5>
        <div className="edit-delete">
          <button className="btn edit"><FontAwesomeIcon icon={faEdit} />Edit</button>
          <button className="btn delete"><FontAwesomeIcon icon={faTrashAlt} />Delete</button>
        </div>
      </div>
      <div className="actions">
        <button className="btn download"><FontAwesomeIcon icon={faDownload} />Download PDF</button>
        <button className="btn print"> <FontAwesomeIcon icon={faPrint} />Print PDF</button>
        <button className="btn share"><FontAwesomeIcon icon={faShare} />Share</button>
        <button className="btn convert">Convert to Invoice</button>
      </div>
      <div className="form-container">
        <div className="form-containera">
        <div className="form-header">
          <div className="left-sectiona">
          {/* <img className='imga' src={downloadlogo12} alt="" /> */}
            <strong className='headingaa'>ULTRAQUERY TECHNOLOGIES</strong>
            <div className='cona'>HEAD OFFICE: PLOT NO. A-65, F202 VIGHNAHARTA APT, OPP. SANDIPANI SCHOOL, KATOL-WADI RING ROAD, NAGPUR-440013 (MH) <br />
            Reg. Off: Plot No.56, Dhantoli, Katol, Nagpur(MH) <br />
            Email: info@ultraquery.com | www.ultraquery.com <br />
            GSTIN: 27BYUPB2582F1Z7 | Mobile: 8087151660 <br />
            PAN Number: BYUPB2582F</div>
          </div>
          <div className="right-sectiona">
            <div className="info-item"><strong>Quotation No:</strong> <br /> UT/QO/24-25/9</div>
            <div className="info-item"><strong>Quotation Date:</strong> <br /> 05/06/2024</div>
            <div className="info-item"><strong>Expiry Date:</strong> <br /> 05/07/2024</div>
          </div>
        </div>
        <div className="form-body">
          <div className="left-sectionb">
            <label>Bill To:</label>
            <div>Pt.Bachharaj Vyas Vidyalaya</div>
          </div>
          <div className="right-sectionb">
            <label>Ship To:</label>
            <div>Pt.Bachharaj Vyas Vidyalaya</div>
          </div>
        </div>
        </div>
        <div className="table-container">
          <table className='tbla'>
            <thead>
              <tr className='trc'>
                <th className='tha'>S.NO.</th>
                <th className='tha'>ITEMS</th>
                <th className='tha'>QTY.</th>
                <th className='tha'>RATE</th>
                <th className='tha'>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr className='trb'>
                <td style={{textAlign: 'center',borderLeft: '1px solid black'}}>1</td>
                <td className='tdb'>WINDOWS ACTIVATION KEY<br />WINDOWS 10 licence</td>
                <td className='tda'>6 PCS</td>
                <td className='tda'>1,050</td>
                <td className='tda'>6,300</td>
              </tr>
              <tr>
                <td  style={{textAlign: 'center',borderLeft: '1px solid black'}}>2</td>
                <td className='tdb'>ANTIVIRUS TOTAL SECURITY</td>
                <td className='tda'>6 PCS</td>
                <td className='tda'>750</td>
                <td className='tda'>4,500</td>
              </tr>
              <tr>
                <td className='tdb'></td>
                <td className='tdaa'>CGST</td>
                <td className='tdaa'>-</td>
                <td className='tdaa'>-</td>
                <td className='tdaa'>₹ 972</td>
              </tr> 
              <tr>
                <td className='tdb'></td>
                <td className='tdab'>SGST</td>
                <td className='tdab'>-</td>
                <td className='tdab'>-</td>
                <td className='tdab'>₹ 972</td>
              </tr>
              <tr className='tra'>
                <td></td>
                <td className='tda'>TOTAL</td>
                <td className='tda'>12</td>
                <td className='tda'></td>
                <td className='tda'>₹ 12,744</td>
              </tr>
            </tbody>
          </table>
          {/* <div className="totals">
            <table>
              <tbody>
                <tr>
                  <td>TOTAL</td>
                  <td>₹ 12,744</td>
                </tr>
              </tbody>
            </table>
          </div> */}
          <table className="tax-table">
            <thead className='theada'>
              <tr>
                <th>HSN/SAC</th>
                <th>Taxable Value</th>
                <th colSpan="2">CGST</th>
                <th colSpan="2">SGST</th>
                <th>Total Tax Amount</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Rate</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='theadb'>
              <tr>
                <td>-</td>
                <td>10,800</td>
                <td>9%</td>
                <td>972</td>
                <td>9%</td>
                <td>972</td>
                <td>1,944</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>10,800</td>
                <td></td>
                <td>972</td>
                <td></td>
                <td>972</td>
                <td>1,944</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="footer-section">
          <div className="total-amount">
            <strong>Total Amount (in words)</strong>
            <p>Twelve Thousand Seven Hundred Forty Four Rupees</p>
          </div>
          <div className="bank-terms">
            <div className="bank-details">
              <strong>Bank Details</strong>
              <div className='det1'>Name: ULTRAQUERY TECHNOLOGIES <br />
                 IFSC Code: HDFC0002126 <br />
                 Account No: 50200061353004 <br />
                 Bank: HDFC Bank, KATOL</div>
            </div>
            <div className="terms-conditions">
              <strong>Terms and Conditions</strong>
              <div className='det2'>1. 100% Advance with Purchase Order. <br />
              2. Interest @ 24%p.a. will be charged if bill is not paid within 10 days. <br />
              3. No warranty on physical burn/damages. <br />
              4. Subject to Nagpur Court Jurisdiction only. <br />
              5. 01 year product warranty and support service Included <br />
              6. Burn/Physical Damage/Electrical High Voltage Burn/Lightning Not covered in Warranty.</div>
            </div>
            <div className="signature">
              <img src="signature.png" alt="Signature" />
              <p>Authorised Signatory For ULTRAQUERY TECHNOLOGIES</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estimate_view;
