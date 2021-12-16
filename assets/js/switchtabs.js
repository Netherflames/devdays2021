function switchTab(id) {
  if (id == "indi") {
    document.getElementById("sheet").innerHTML = '<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS5kxLXyAMqfeNXWlm6BpOswwnvrbMszMZfCpo07uP-EVWULa93JhZ2EWJai1UkLkdxvrOhidWsOI_u/pubhtml?gid=145607175&amp;single=true&amp;widget=true&amp;headers=false" style="width: 100%; height: 50vh;"></iframe>';
    document.getElementById(id).classList.add("active");
    document.getElementById("team").classList.remove("active");
  } else if (id == "team") {
    document.getElementById("sheet").innerHTML = '<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS5kxLXyAMqfeNXWlm6BpOswwnvrbMszMZfCpo07uP-EVWULa93JhZ2EWJai1UkLkdxvrOhidWsOI_u/pubhtml?gid=1460310197&amp;single=true&amp;widget=true&amp;headers=false" style="width: 100%; height: 50vh;"></iframe>';
    document.getElementById(id).classList.add("active");
    document.getElementById("indi").classList.remove("active");
  }
}