#!/usr/bin/env node
const { Transform } = require('stream');

// class TimeTransformer extends stream.Transform {
//     _transform(chunk, encoding, cb) {
//         //console.log(chunk.toString())
//         let result = convert(chunk.toString().trim())
//         result.forEach(this.push)
//         cb(null)
//     }
// }

let transformer = new Transform({
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
        //console.log(chunk.toString())
        let result = convert(chunk.toString().trim())
        result.map(x => x + "\n").forEach(x => {
            this.push(x)
        })
        callback(null)

    }
})


//transformer._transformState = {}

function convert_unixtimestamp(str){
    const stamp = parseInt(str)
    let d = new Date()
    let additionalNote = ""

    if (stamp < 1e13) {
        d = new Date(stamp)
    } else if (stamp < 1e16) {
        // note: working with module for large numbers seems to have a bug
        //  1552999980047000000 % 1e3 is 64. But should be 0 (zero)
        //  therefore using substring
        d = new Date(stamp / 1e3)
        additionalNote = "µs: " + str.substr(-3)
    } else if (stamp < 1e19) {
        d = new Date(stamp / 1e6)
        additionalNote = "ns: " + str.substr(-6)
    } else {
        return "invalid date: " + str
    }
    return d.toISOString() + (additionalNote ? ` (${additionalNote})` : "")
}

function convert(str) {
    //console.log("input: ", inputs)
    inputs = str.split("\n")
    return inputs.map(convert_unixtimestamp)
}

if (process.argv.length > 2) {
    let arg = process.argv[2]
    convert(arg).forEach(xs => {
        console.log(xs)
    })
} else {
    process.stdin.pipe(transformer).pipe(process.stdout)
    // process.stdin.pipe(new stream.Transform({
    //     transform(chunk, encoding, callback){
    //         callback(null, chunk.toString().trim() + " bam")
    //     }
    // })).pipe(process.stdout)
}
