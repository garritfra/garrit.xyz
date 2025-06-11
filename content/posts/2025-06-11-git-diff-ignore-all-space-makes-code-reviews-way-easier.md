---
title: "git diff --ignore-all-space makes code review way easier"
date: "2025-06-11"
tags: "guide, note, til, git, tech, programming"
---

I just learned a cool trick that I want to share. Let's review the diff of a file using `git diff`. I redacted most of it, but you probably found yourself in the situation of extremely long changes before:

```
diff --git a/lib/ui/screens/detail/components/body/event_body.dart b/lib/ui/screens/detail/components/body/event_body.dart
index d19d70a..1a61380 100644
--- a/lib/ui/screens/detail/components/body/event_body.dart
+++ b/lib/ui/screens/detail/components/body/event_body.dart
@@ -3,6 +3,7 @@
 class EventBody extends StatelessWidget {
   final EventDetails details;
@@ -18,35 +19,43 @@ class EventBody extends StatelessWidget {
 
   @override
   Widget build(BuildContext context) => Column(
-        crossAxisAlignment: CrossAxisAlignment.stretch,
-        children: [
-          EventInfoView(
-            location: details.location,
-            start: details.start,
-            end: details.end,
-            certified: details.certified,
-            paid: details.paid,
-            points: null, // Already shown in app bar
+    crossAxisAlignment: CrossAxisAlignment.stretch,
+    children: [
+      EventInfoView(
+        location: details.location,
+        start: details.start,
+        end: details.end,
+        certified: details.certified,
+        paid: details.paid,
+        points: null, // Already shown in app bar
+      ),
+      const SizedBox(height: 24),
+      Html(
+        data: details.description,
+        style: {
+          'body': Style(
+            margin: Margins.zero,
...
 }
```

But do you spot what has ACTUALLY been changed? In a real world scenario, it probably took you a while before you realised that it's the result of formatting the entire file. Nobody cares about whitespace when reviewing code. Or rather, your brain should not take the burden of having to care about that. That's what linters are for!

Let's look at the same diff with the `--ignore-all-space` (shorthand `-w`) flag activated:

```
diff --git a/lib/ui/screens/detail/components/body/event_body.dart b/lib/ui/screens/detail/components/body/event_body.dart
index d19d70a..1a61380 100644
--- a/lib/ui/screens/detail/components/body/event_body.dart
+++ b/lib/ui/screens/detail/components/body/event_body.dart
@@ -3,6 +3,7 @@
 class EventBody extends StatelessWidget {
   final EventDetails details;
@@ -29,6 +30,14 @@ class EventBody extends StatelessWidget {
         points: null, // Already shown in app bar
       ),
       const SizedBox(height: 24),
+      Html(
+        data: details.description,
+        style: {
+          'body': Style(
+            margin: Margins.zero,
+          ),
+        },
+      ),
       Text(details.description, style: context.theme.textTheme.body2Regular),
       if (details.registrationUrl != null || details.programUrl != null) const SizedBox(height: 16),
       if (details.registrationUrl != null) ...[
```

Huh, so it's NOT just a formatted file. All whitespace changes have been stripped out, and you only see the changes that are relevant for the review. Neat!

Many tools also support ignoring whitespace. GitLab let's you disable `Show whitespace changes` in the merge request diff viewer. VSCode has the `diffEditor.ignoreTrimWhitespace` setting. So, if you want to make this the default in your tools, chances are there's an option for only showing relevant changes.

A bit of a sloppy post, but I hope this is useful to someone. Happy code reviewing!
