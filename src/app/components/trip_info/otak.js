

import Image_Damper from "../Image_Damper";
// import './otak'

const Date_Selection = () =>{
    const range = Array.from({ length: 42 }, (_, i) => i + 1);
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    const year = [];
    const month = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    



    return(
        <>
            <div className="datepicker shadow-lg/10">
                <h2>Select Date</h2>
                <div className="calendar">
                    <div className="left-side">
                        <div className="controls">
                            <button className="prev">prev</button>
                            <strong className="label">Month YYYY</strong>
                        </div>
                        <div className="days">
                            {days.map((x) => {
                                // console.log(item)
                                return(
                                    <span key={x}>{x}</span>
                                )        
                            })}
                        </div>
                        <div className="dates">
                            {range.map((x) => {
                                const isDisabled = x <= 8 || x >= 35;
                                const isToday = x === 24;
                                // console.log(item)
                                return(
                                    <span key={x} className={`${isDisabled ? "disabled" : ""} ${isToday ? "today" : ""}`}>{x}</span>
                                )        
                            })}
                        </div>
                    </div>

                    <div className="right-side">
                        <div className="controls">
                            <strong className="label">Month YYYY</strong>
                            <button className="next">next</button>
                        </div>
                        <div className="days">
                            {days.map((x) => {
                                // console.log(item)
                                return(
                                    <span key={x}>{x}</span>
                                )        
                            })}
                        </div>
                        <div className="dates">
                            {range.map((x) => {
                                const isDisabled = x <= 8 || x >= 35;
                                const start_range = x === 12 ;
                                const in_range = 12 < x && x < 25 ;
                                const end_range = x === 25;
                                // console.log(item)
                                return(
                                    <span key={x} 
                                    className={`${isDisabled ? "disabled" : ""} ${start_range ? "start_range" : ""} ${in_range ? "in_range" : ""} ${end_range ? "end_range" : ""}`}>{x}</span>
                                )        
                            })}
                        </div>
                    </div>

                    <div className="action-menu">
                        <span className="selection">MM/DD/YYYY - MM/DD/YYYY</span>

                        <button className="cancel">Cancel</button>
                        <button className="apply">Apply</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Date_Selection;