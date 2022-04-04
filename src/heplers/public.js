const str_pad_left = function (pad,string,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
};


export default {
    str_pad_left,
}
