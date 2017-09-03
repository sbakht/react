const NameMap = [
  '3rd Person Singular Masculine',
  '3rd Person Dual Masculine',
  '3rd Person Plural Masculine',
  '3rd Person Singular Feminine',
  '3rd Person Dual Feminine',
  '3rd Person Plural Feminine',
  '2nd Person Singular Masculine',
  '2nd Person Dual Masculine',
  '2nd Person Plural Masculine',
  '2nd Person Singular Feminine',
  '2nd Person Dual Feminine',
  '2nd Person Plural Feminine',
  '1st Person Singular',
  '1st Person Plural'
];

const FilterByName = {
  filter: function(str) {
    this.filtered = NameMap.filter(name => {
      var re = new RegExp(str, 'i');
      return name.match(re);
    });
    return this;
  },
  toIndex: function(arr = this.filtered) {
    var indexes = arr.map(name => {
      return NameMap.indexOf(name);
    });
    return indexes;
  }
}

export { FilterByName };