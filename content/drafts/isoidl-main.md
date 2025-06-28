---
title: IsoIdl
date: 2025-06-29
draft: "true"
tags:
  - IsoIdl
  - GridBasedMovement
  - Pathfinding
  - ISM
  - HexagonalGrid
  - TurnBasedStrategy
  - UE5
  - Plugin
  - Game
---

| Info                |                                                        |
| ------------------- | ------------------------------------------------------ |
| **Project Title**   | <span style="font-variant:small-caps;">*IsoIdl*</span> |
| **Project Type**    | *Plugin, Game*                                         |
| **Engine**          | *UE 5.5.4*                                             |
| **Version Control** | *none*                                                 |
| **Repository**      | *N/A*                                                  |
> [!info]
> <span style="font-variant:small-caps;">*IsoIdl*</span> is a turn-based strategy game made in UE5 using Blueprints. The grid-based elements (movement, tile generation, pathfinding, etc.) will eventually be made into a Plugin to release on Fab.

<span style="font-variant:small-caps;">*IsoIdl*</span> started as a game jam idea. Well—sort of. The truth is that I'd been wanting to make a turn-based strategy RPG for years but seemed to be at a loss for where to get started. The reality is that RPGs are *a lot* to develop, especially if—like me—you have the tendency to really get down in the weeds when designing good stories and good characters. 

As a result, when a fellow SNHU alum started a game jam (with the theme: Shape Science!!!) for students and recent alumni, I took it as my opportunity to finally start making progress on this dream. An sRPG is too complex? Better start with the very basics then: figure out grid-based movement and pathfinding in a simpler project. I started in Blueprints, even though I knew it would be algorithmically complex, because I anticipated that I would be racing to make this playable by the end of the jam.

A confluence of 3 events that transpired after the start of the jam would prevent me from doing so:
1. I got wrecked by allergies.
2. I finally landed a job interview, which I needed to prep for.
3. A record-breaking heatwave rendered my office unusable for an entire week.

So now the jam is over, and although I don't have anything *playable* to show for it, I made substantial progress. I was able to spawn a hex grid using an [[Instanced Static Mesh]], control the individual tile colors using [[Custom Data Values]], and implement [[A* pathfinding]]. Not too shabby. And it was all in Blueprints, which I was admittedly rusty in after writing the majority of my projects in C++. (Not to mention that most algorithms involving loops are a *labor* in Blueprints, despite my best efforts to clean them up.) 

Before I go any further, my first challenge is to do it all again, but in C++ this time. This is crucial to the well-being of both my mental health and the project. I simply cannot maintain a pathfinding system written entirely in Blueprints. And, since I want to use this system in the future after finishing <span style="font-variant:small-caps;">*IsoIdl*</span>, on a project that will definitely be using C++, it will simply be much easier to write it as a C++ UE Plugin.
## Roadmap
> [!abstract]+ Port What I've Already Done To C++
>- [ ] Create Plugin
>- [ ] Transfer `BP_Grid`
>- [ ] Transfer `BP_Pathfinding` (this should be made into an Actor component)

>[!abstract]+ Finish <span style="font-variant:small-caps;">*IsoIdl*</span>
> - [ ] Create pawns (should have a basic attribute set)
> - [ ] Spawn pawns according to grid
> - [ ] Grid-based movement
> - [ ] Create Actions and UI (move, attack, etc.)
> - [ ] Implement XP and level up system
> - [ ] Create formation system (shape science, baby!)
> - [ ] Define turn-based structure
> - [ ] Make main menu