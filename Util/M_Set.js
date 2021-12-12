class M_Set {
  constructor(...arr) {
    if (typeof arr !== 'array' && typeof arr !== 'object') arr = [];
    this.elements = [];
    arr.flat(99).forEach(c => this.add(c));
  }

  exists(element) {
    return !!this.elements.find(v => v === element);
  }

  add(element) {
    if (this.exists(element)) return false;
    this.elements.push(element);
  }

  addSet(m_set) {
    this.elements.push(...m_set.elements);
  }

	equals(m_set) {
		return this.intersection(m_set).length === this.length && this.length === m_set.length;
	}

// elements that only exist in both m_sets
  intersection(m_set) {
    return new M_Set(this.elements.filter(e => m_set.exists(e)));
  }

// every elements that exists in at least one m_sets
  union(m_set) {
    return new M_Set(this.elements, m_set.elements);
  }

// elements only in eitherm_set
  symmetric_difference(m_set) {
    return this.union(m_set).minus(this.intersection(m_set));
  }

// elements in this m_set but not in the other m_set
  minus(m_set) {
    return new m_set(this.elements.filter(e => !m_set.exists(e)));
  }

	get length() {
		return this.elements.length;
	}
}
module.exports = M_Set;