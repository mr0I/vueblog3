const str_pad_left = function (pad,string,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
};

module.exports = {
    str_pad_left
};
