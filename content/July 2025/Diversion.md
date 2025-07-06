---
title: Why I Use Diversion VC for my Current Projects
date: 2025-07-05
draft: "false"
tags:
  - Aura
  - UE5
  - SourceControl
  - IsoIdl
  - Diversion
  - VersionControl
description: "After years of exclusively using Git and Git LFS for my game development projects, I found myself in a predicament: getting teammates up to speed using Git for short term projects is a difficult task."
---
## The Problem
At [The Dev Pit – Underground Code Club](https://sites.google.com/view/thedevpit), a computer science and game development club run by SNHU students and alumni, I occasionally host game jam teams. These teams consist of students of all skill levels and aim to complete a small game in Unreal Engine within a short time frame—generally a few weeks to a couple of months long. When the teams are mostly upperclassmen or alums, setting up source control for them is not difficult. Game Programming and Development students at SNHU learn Git LFS during the program, so seniors and alums may need refreshers or occasional help, but they can generally hold their own when interacting with a repository. 

However, with less experienced students, Git LFS can become a hurdle that prevents them from making meaningful contributions to the team. When development is only a few weeks long, there simply isn't enough time to bring them up to speed unless they already have some source control experience outside of school—which is a rarity. Rather than turn these students away, I opted for finding a source control solution that would work for everyone.

>Git has a steep introductory learning curve, which is not ideal for students doing short-term development projects. A simpler solution is needed that can perform well right out of the box.

## The Solution
### Requirements
I identified the following requirements for my use case. The VCS must:
- Be simple to use (for newer students)
- Not be so different from Git that seniors and alums would need extra time to learn it
- Handle large asset files well (locking)
- Have some integration with Unreal Engine
- Have cloud-based hosting options that do not have a prohibitively low storage limit

### Options
All of the version control systems that I knew of did not pass this checklist for one reason or another.

Git was not simple enough for students to learn within a few days, and though Git LFS could handle large files, it added yet another layer of complexity, and it was clunky. In addition, the most common repository hubs for Git have quite low LFS storage limits and bandwidth on their free tiers—except for Azure DevOps, though that is quite bulky for a game jam.

P4 was an obvious next choice. It handles large files well and integrates seamlessly with Unreal Engine. Unfortunately, P4 is self-hosted, which was a non starter for this use-case. It is also quite different from Git.

Another option was SVN, but it had many of the same drawbacks as P4. 

### Diversion
I needed something different, so I went to a place where developers spend lots of time complaining about various VCS's: Reddit. I found [this post](https://www.reddit.com/r/unrealengine/comments/1ewpk35/comment/lj18hp6/) which led me to [Diversion VC](https://www.diversion.dev/).

![[Images/Pasted image 20250705223313.png]]

After looking into it more, Diversion checked all my boxes:
- Has nice desktop app; beginner friendly.
- Workflow is simpler but very similar to Git (status, commit, fast branching), though commits require Internet (not a problem for this use case). Has good CLI for more experienced users who want that.
- Syncing large files is fast and easy. However, Diversion does not yet support file locking. This is not too big of an issue though because...
- Diversion's Unreal Engine plugin supports soft-locking in the engine, so while you won't be prevented from editing files, you will be warned if the file is currently being edited elsewhere. This is good enough for our purposes. 
- Diversion hosts repositories through the cloud, and it's free for up to 100GB, which is a steal. 

Now, Diversion is probably not perfect for everyone. It is still a very young version control system in development, lacks more advanced features, and is likely not ready for large-scale game production. But for game jams, this might be a valuable resource. In preparation for introducing it to The Dev Pit, I've been using Diversion for my project [[June 2025/Aura|Aura]], and it has been smooth sailing. I'll be using it for [[June 2025/IsoIdl|IsoIdl]] as well once I start the plugin development phase of that project. 

I'll report back once I've tested it in a game jam setting, but I have a feeling that it will enable less experienced devs to contribute to small projects in ways that weren't previously possible using Git.