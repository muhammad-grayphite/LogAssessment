'use strict';

const { MinHeap } = require('@datastructures-js/heap');
const { getLogEntry } = require('../utils/getLogEntry')


const heap = new MinHeap((entryToInsert) => entryToInsert.date)



module.exports = (logSources, printer) => {

	logSources?.forEach((logSource, index) => {
		let entryToInsert = getLogEntry(logSource, index)
		entryToInsert ? heap.insert(entryToInsert) : false

	});
	//removes and returns the root (top) value of the heap
	let topOfMinHeap = heap.extractRoot()

	while (topOfMinHeap) {
		// print top of min head on the console using printer
		printer.print(topOfMinHeap)
		let itemPoppedSource = topOfMinHeap?.index
		// insert the next entry from the source whose entry has been popped and printed to console
		let nextEntry = logSources[itemPoppedSource].pop()
		nextEntry ? heap.insert({ ...nextEntry, 'index': itemPoppedSource }) : false
		topOfMinHeap = heap.extractRoot()
	}
	console.log(printer.done());



}