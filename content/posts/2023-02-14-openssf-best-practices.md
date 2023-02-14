---
title: OpenSSF Best Practices
date: "2023-02-14"
tags: "note, 100DaysToOffload"
---

The Open Source Security Foundation (OpenSSF) provides [a list of best
practices](https://bestpractices.coreinfrastructure.org/en/criteria/0) for open
source projects. Although this list is tailored towards free and open source
projects, I believe that this list is valuable for *all* software projects.
Here's a breakdown of all practices that I consider generic to all projects, no
matter its license, alongside some personal notes.

## Basics

### Basic project website content

> The project website MUST succinctly describe what the software does (what problem does it solve?).

A website might not always apply, but a README is a good place to put this information.

> The information on how to contribute MUST explain the contribution process (e.g., are pull requests used?)

This information is also best placed in the README.

> The information on how to contribute SHOULD include the requirements for acceptable contributions (e.g., a reference to any required coding standard)

-> README.

### Documentation

> The project MUST provide basic documentation for the software produced by the
project.

> The project MUST provide reference documentation that describes the external
interface (both input and output) of the software produced by the project.

I wouldn't consider reference documentation a requirement, but it's nice to
have.

### Other

> The project sites (website, repository, and download URLs) MUST support HTTPS using TLS.

## Change Control

### Public version-controlled source repository

> The project MUST have a version-controlled source repository ~~that is publicly readable and has a URL~~.

> The project's source repository MUST track what changes were made, who made
the changes, and when the changes were made.

> To enable collaborative review, the project's source repository MUST include interim versions for review between releases; it MUST NOT include only final releases.

In some cases, code can't or shouldn't be versioned. For most website projects,
review environments in merge requests (Vercel, Netlify, GitLab) could be
considered.

> It is SUGGESTED that common distributed version control software be used (e.g., git) for the project's source repository.

### Unique version numbering

> The project results MUST have a unique version identifier for each release
intended to be used by users.

Commit hashes can be used as unique version numbers in some cases.

> It is SUGGESTED that the Semantic Versioning (SemVer) or Calendar Versioning
(CalVer) version numbering format be used for releases. It is SUGGESTED that
those who use CalVer include a micro level value.

As mentioned above, projects that are constantly in motion (e.g.
[darktheme.club](https://darktheme.club/)) might want to consider using commit
hashes for version numbers instead.

> It is SUGGESTED that projects identify each release within their version
control system. For example, it is SUGGESTED that those using git identify each
release using git tags.

Git tags are often neglected during development, but can be very useful.

### Release notes

> The project MUST provide, in each release, release notes that are a
human-readable summary of major changes in that release to help users determine
if they should upgrade and what the upgrade impact will be. The release notes
MUST NOT be the raw output of a version control log (e.g., the "git log" command
results are not release notes). Projects whose results are not intended for
reuse in multiple locations (such as the software for a single website or
service) AND employ continuous delivery MAY select "N/A".

I wrote [a post](/posts/2021-02-20-changelogs) about changelogs a while back.


> The release notes MUST identify every publicly known run-time vulnerability
fixed in this release that already had a CVE assignment or similar when the
release was created. This criterion may be marked as not applicable (N/A) if
users typically cannot practically update the software themselves (e.g., as
is often true for kernel updates). This criterion applies only to the
project results, not to its dependencies. If there are no release notes or
there have been no publicly known vulnerabilities, choose N/A.

## Reporting

### Vulnerability report process

> If private vulnerability reports are supported, the project MUST include how
to send the information in a way that is kept private.

For private projects, it's often a good idea to have a public "Report an issue"
feature.

## Quality

### Working build system

> If the software produced by the project requires building for use, the
project MUST provide a working build system that can automatically rebuild
the software from source code.

> It is SUGGESTED that common tools be used for building the software.

### Automated test suite

> The project MUST use at least one automated test suite ~~that is publicly
released as FLOSS (this test suite may be maintained as a separate FLOSS
project)~~. The project MUST clearly show or document how to run the test
suite(s) (e.g., via a continuous integration (CI) script or via documentation in
files such as BUILD.md, README.md, or CONTRIBUTING.md).

> A test suite SHOULD be invocable in a standard way for that language.

E.g. `npm run test`, `cargo test`, etc.

> It is SUGGESTED that the test suite cover most (or ideally all) the code
branches, input fields, and functionality.

Write tests if they are useful, not for the sake of having 100% test coverage.

> It is SUGGESTED that the project implement continuous integration (where new
or changed code is frequently integrated into a central code repository and
automated tests are run on the result).

### New functionality testing

> The project MUST have a general policy (formal or not) that as major new
functionality is added to the software produced by the project, tests of that
functionality should be added to an automated test suite.

> The project MUST have evidence that the test policy for adding tests has been
adhered to in the most recent major changes to the software produced by the
project.

This is often covered if you have a CI pipeline.

> It is SUGGESTED that this policy on adding tests (see test_policy) be
documented in the instructions for change proposals.

Consider adding a checkbox to your merge request template. For reference, here's
a checklist that I often use in templates:

```
# Checklist:

- [ ] documented in the changelog
- [ ] sufficiently tested
- [ ] sufficiently documented
```

### Warning flags

> The project MUST enable one or more compiler warning flags, a "safe"
language mode, or use a separate "linter" tool to look for code quality
errors or common simple mistakes, if there is at least one FLOSS tool that
can implement this criterion in the selected language.

> The project MUST address warnings.

Ensure this by disallowing warnings in your CI pipeline.

> It is SUGGESTED that projects be maximally strict with warnings in the
software produced by the project, where practical.

## Security

### Secure development knowledge

> The project MUST have at least one primary developer who knows how to design
secure software.

> At least one of the project's primary developers MUST know of common kinds of
errors that lead to vulnerabilities in this kind of software, as well as at
least one method to counter or mitigate each of them.

Easier said than done, but be vocal if you're hesitant towards a feature or
implementation path.

### Use basic good cryptographic practices

> The software produced by the project MUST use, by default, only cryptographic
protocols and algorithms that are publicly published and reviewed by experts (if
cryptographic protocols and algorithms are used).

> If the software produced by the project is an application or library, and its
primary purpose is not to implement cryptography, then it SHOULD only call on
software specifically designed to implement cryptographic functions; it SHOULD
NOT re-implement its own.

Don't reinvent the wheel. Not just for cryptography.

> The security mechanisms within the software produced by the project MUST use
default keylengths that at least meet the NIST minimum requirements through the
year 2030 (as stated in 2012). It MUST be possible to configure the software so
that smaller keylengths are completely disabled.

> The default security mechanisms within the software produced by the project
MUST NOT depend on broken cryptographic algorithms (e.g., MD4, MD5, single DES,
RC4, Dual_EC_DRBG), or use cipher modes that are inappropriate to the context,
unless they are necessary to implement an interoperable protocol (where the
protocol implemented is the most recent version of that standard broadly
supported by the network ecosystem, that ecosystem requires the use of such an
algorithm or mode, and that ecosystem does not offer any more secure
alternative). The documentation MUST describe any relevant security risks and
any known mitigations if these broken algorithms or modes are necessary for an
interoperable protocol.

> The default security mechanisms within the software produced by the project
SHOULD NOT depend on cryptographic algorithms or modes with known serious
weaknesses (e.g., the SHA-1 cryptographic hash algorithm or the CBC mode in
SSH).

> The security mechanisms within the software produced by the project SHOULD
implement perfect forward secrecy for key agreement protocols so a session key
derived from a set of long-term keys cannot be compromised if one of the
long-term keys is compromised in the future.

> If the software produced by the project causes the storing of passwords for
authentication of external users, the passwords MUST be stored as iterated
hashes with a per-user salt by using a key stretching (iterated) algorithm
(e.g., Argon2id, Bcrypt, Scrypt, or PBKDF2). See also OWASP Password Storage
Cheat Sheet).


> The security mechanisms within the software produced by the project MUST
generate all cryptographic keys and nonces using a cryptographically secure
random number generator, and MUST NOT do so using generators that are
cryptographically insecure.

### Secured delivery against man-in-the-middle (MITM) attacks

> The project MUST use a delivery mechanism that counters MITM attacks. Using
https or ssh+scp is acceptable.

> A cryptographic hash (e.g., a sha1sum) MUST NOT be retrieved over http and
used without checking for a cryptographic signature.

### Publicly known vulnerabilities fixed

> There MUST be no unpatched vulnerabilities of medium or higher severity that
have been publicly known for more than 60 days.

This can be ensured using
[Dependabot](https://docs.github.com/en/code-security/dependabot/working-with-dependabot)
or [Renovate](https://docs.renovatebot.com/)

> Projects SHOULD fix all critical vulnerabilities rapidly after they are reported.

Again, use automatic dependency updating mechanisms for this.

### Other security issues

> The public repositories MUST NOT leak a valid private credential (e.g., a
working password or private key) that is intended to limit public access.

## Analysis

### Static code analysis

> At least one static code analysis tool (beyond compiler warnings and "safe"
language modes) MUST be applied to any proposed major production release of the
software before its release, if there is at least one ~~FLOSS~~ tool that implements
this criterion in the selected language.

> It is SUGGESTED that at least one of the static analysis tools used for the
static_analysis criterion include rules or approaches to look for common
vulnerabilities in the analyzed language or environment.

> All medium and higher severity exploitable vulnerabilities discovered with
static code analysis MUST be fixed in a timely way after they are confirmed.

> It is SUGGESTED that static source code analysis occur on every commit or at
least daily.

### Dynamic code analysis

> It is SUGGESTED that at least one dynamic analysis tool be applied to any
proposed major production release of the software before its release.

> It is SUGGESTED that if the software produced by the project includes
software written using a memory-unsafe language (e.g., C or C++), then at
least one dynamic tool (e.g., a fuzzer or web application scanner) be
routinely used in combination with a mechanism to detect memory safety
problems such as buffer overwrites.

This is often overlooked.

> It is SUGGESTED that the project use a configuration for at least some dynamic
analysis (such as testing or fuzzing) which enables many assertions. In many
cases these assertions should not be enabled in production builds.

> All medium and higher severity exploitable vulnerabilities discovered with
dynamic code analysis MUST be fixed in a timely way after they are confirmed.

This is post 046 of [#100DaysToOffload](https://100daystooffload.com/).
