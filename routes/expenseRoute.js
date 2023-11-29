export default function (servicesFunc) {
  function home(req, res) {
    try {
      res.render("index");
    } catch (err) {
      console.log(err);
    }
  }
  function expense(req, res) {
    try {
      res.render("expense");
    } catch (err) {
      console.log(err);
    }
  }
  return { home, expense };
}
