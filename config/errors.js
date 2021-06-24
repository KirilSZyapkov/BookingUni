module.exports = (err) => {
    let message
    if(err.errors === undefined){
        message = err.message;
        
    } else {
        message = Object.values(err.errors).join('\n');
                        
    }

    return message
}