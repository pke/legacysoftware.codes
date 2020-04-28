---
lscodes: O++S++IC+EMV+PS++D-
---

# Legacy Software Codes Generator & Decoder

Based on the idea of fefe [published at 36c3](https://media.ccc.de/v/36c3-10608-das_nutzlich-unbedenklich_spektrum).

## Generator

The [generator](http://lscodes.pke.fyi) allows you to create legacy software codes via a simple form user interface.

## Decoding API

| Query Param | Description |
|-------------|-------------|
| q | Code to query |
| v | verbose output in error cases |

Accepts `text/plain` (default), `text/csv`, `text/yaml`.

[This project](http://lscodes.pke.fyi/api/decode?q=O++S++IC+EMV+PS++D-)

`curl 'http://lscodes.pke.fyi/api/decode?q=O++S++IC+EMV+PS++D-'`

```tty
Ownership: Public Domain | MIT | Apache
Source Code: The source code is public and you can change it.
Intent, Confidence: I tried to avoid security bugs while writing this.
Correctness: No open bugs, 100% test coverage and we do regular code audits.
Engineering / Design: We try to detect bad arguments
Maintenance: Project gets updated regularly.
Volatility: Regular patches and updates but you can't tell the difference.
Protocol / Spec: The spec is public, short and precise.
Dependencies: We don't even have a list of the dependencies.
```

[Zstandard](http://lscodes.pke.fyi/api/decode?q=O++S++I++C+EMV+PS++D++)

`curl 'http://lscodes.pke.fyi/api/decode?q=O++S++I++C+EMV+PS++D++'`

```tty
Ownership: Public Domain | MIT | Apache
Source Code: The source code is public and you can change it.
Intent, Confidence: I have done this multiple times before. I know what I am doing.
Correctness: No open bugs, 100% test coverage and wie do regular code audits.
Engineering / Design: We try to detect bad arguments
Maintenance: Project gets updated regularly.
Volatility: Regular patches and updates but you can't tell the difference.
Protocol / Spec: The spec is public, short and precise.
Dependencies: We depend only on things that come with the system.
```

[Wordpress](http://lscodes.pke.fyi/api/decode?q=O++S++I--C-E-MV-!PSD--)

`curl 'http://lscodes.pke.fyi/api/decode?q=O++S++I--C-E-MV-!PSD--'`

```tty
Ownership: Public Domain | MIT | Apache
Source Code: The source code is public and you can change it.
Intent, Confidence: The guy left. Code now maintained by a team in India.
Correctness: We have a bug backlog.
Engineering / Design: Well..., we fix bugs. That's good, right?
Maintenance: Project gets updated regularly.
Volatility: Updating is such a hassle that back-porting patches is a thing.
Protocol / Spec: The author made it up as he went.
Dependencies: We load extensions dynamically from the Internet.
```

## License

MIT