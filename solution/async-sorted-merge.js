'use strict'
const { MinHeap } = require('@datastructures-js/heap');

const heap = new MinHeap((entryToInsert) => entryToInsert.date)


module.exports = (logSources, printer) => {

    let promises = []



    logSources?.forEach((source, idx) => {
        promises?.push(source.popAsync().then(function (res) {
            if (res) {
                let entryToInsert = { ...res, 'index': idx }
                heap.insert(entryToInsert)
            }

        }))
    })



    Promise.all(promises).then(function () {
        popLogEntry(heap.extractRoot());
    });


    let popLogEntry = (topNode) => {
        if (!topNode) {
            printer.done()
            return true
        }
        printer.print(topNode);
        var poppedLogSource = topNode?.index;
        logSources[poppedLogSource]?.popAsync()
            .then(function (res) {
                if (res) {
                    let entryToInsert = { ...res, 'index': poppedLogSource }
                    heap?.insert(entryToInsert);
                }
                popLogEntry(heap?.extractRoot())
            })
            .catch(function (err) {
                console.log(err)
            });
    };


}