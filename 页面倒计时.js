const bu0 = (val) => {
    return val > 9 ? val : '0' + val

}
function formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    return {
        days: bu0(days),
        hours: bu0(hours),
        minutes: bu0(minutes),
        seconds: bu0(parseInt(seconds))
    }
}
export default formatDuring
//配合定时器使用
