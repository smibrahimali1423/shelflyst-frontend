import React, { useEffect } from 'react';

function Alert({ alert, clearAlert }) {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "Error";
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    useEffect(() => {
        // Hide the alert after 3 seconds
        const timer = setTimeout(() => {
            clearAlert(); // Call function to clear alert
        }, 3000);

        // Cleanup timer if the component unmounts or alert changes
        return () => clearTimeout(timer);
    }, [alert, clearAlert]);

    return (
        <div style={{ 
            height: "50px", 
            position: "fixed", 
            top: "0", 
            left: "0", 
            width: "100%", 
            zIndex: "9999"
        }}>
            {alert && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{capitalize(alert.type)}</strong>: {alert.msg}
                </div>
            )}
        </div>
    );
}

export default Alert;
