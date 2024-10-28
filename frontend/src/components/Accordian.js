import React, { useState } from "react"

function Accordian() {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="accordion-item">
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <div>{title}</div>
                <div>{isActive ?<i class="fa-solid fa-caret-up"></i> : <i class="fa-solid fa-caret-down"></i>}</div>
            </div>
            {isActive && <div className="accordion-content">{content}</div>}
        </div>
    )
}

export default Accordian;