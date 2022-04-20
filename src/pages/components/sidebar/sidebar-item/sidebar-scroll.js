import React, { useState } from "react";
import { Link } from 'react-router-dom';

function SideBarScroll({ link, title,isExpanded,children }) {
      const [expanded, setExpanded] = useState(false);

    return (
      <div className="flex flex-col">
        <div
          className={`item ${!expanded ? "mb-30" : "active"}  `}
          onClick={() => setExpanded(!expanded)}
        >
          {children}

          <p className="item-title ml-2 cursor-pointer">
            <span className="text-lg text-decoration-none">{title}</span>
          </p>
        </div>
        {expanded && (
          <div className="item ml-9 mb-30 mt-3">
            <ul>
              <li className="mb-3 hover:text-purple-800">
                {" "}
                <p className="  cursor-pointer ">
                  <Link to="/add-product">
                    <span className="text-md  text-decoration-none">
                      Tambah product
                    </span>
                  </Link>
                </p>
              </li>
              <li>
                {" "}
                <p className="  cursor-pointer">
                  <Link to="/products">
                    <span className="text-md text-decoration-none">
                      Lihat product
                    </span>
                  </Link>
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
}

export default SideBarScroll