public List<k> getPath(k key){
	List<V> result = new LinkedList<V>();
		return getPathAux(key,this.root,result);
}

private List<V> getPathAux(k key, node N, List<V> L){
	
	if(N== NULL){
		return null;
	}

	else{

		int comparison = this.comparator.compareTo(key,n.getKey());
		L.add(n.getKey());
		
		if(comparison ==0){
		return L;
		}

		else if(comparision<0){
		return getPathAux(key,n.getleftChild,L);
		}

		else {
		return getPathAux(key,n.getrightChild,L);
		}

	}
}
