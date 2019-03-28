# unixtime-cli

## Installation

    npm i -g @robie2011/unixtime-cli


## Usage

    utime UNIXTIMESTAMP_IN_SECONDS
    utime UNIXTIMESTAMP_IN_MILLISECONDS
    utime UNIXTIMESTAMP_IN_NANOSECODS

## Using as pipe
you can also use command for piping with other shell commands.^


## Examples
```
utime 1553002319947000000
2019-03-19T13:31:59.947Z (ns: 000000)

utime 1553002319947000
2019-03-19T13:31:59.947Z (µs: 000)

utime 1553002319947
2019-03-19T13:31:59.947Z

```