import React from "react";

const CsvExport = ({children, data, fileName}) => {

    let href = null;
    if (data) {
        let csvContent = "";
        data.forEach(element => {
            csvContent += element.type + "," + element.hash + "\n";
        });

        const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
        href = URL.createObjectURL(blob);
    }

    return (
        data ? (
                <a href={href} download={fileName} target={"_self"}
                   style={{textDecoration: "none"}}>
                    {children}
                </a>
            ) : {children}
    );
};

export default CsvExport;
