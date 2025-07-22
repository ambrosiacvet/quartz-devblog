---
title: "Spell Menu UI: A Trial by Fire"
date: 2025-07-21
draft: "false"
tags:
  - Aura
  - UE5
  - Game
  - UI
description: A breakdown of how I implemented a full spell equip menu in Unreal Engine 5 using GAS, including UI challenges and system flow diagrams.
---
For my project [[June 2025/Aura|Aura]], which is all about learning Unreal Engine's Gameplay Ability System ( #GAS), the [course I was following](https://www.udemy.com/course/unreal-engine-5-gas-top-down-rpg) came to a point where progress with the ability system couldn't really be made until a Spell Menu was created to facilitate the development of certain features—such as equipping new abilities and assigning them to inputs. This menu is so detailed and complex, that its construction and implementation spanned **34 lessons** (almost 10%) of the course. Finishing it was a huge milestone, so I've uploaded a video of it in action.

> [!warning] Headphone Warning! 
> Some of the sound effects in this snippet are quite loud.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/mjBAQQ68ty4?si=Aa9xe1tMwYusQvKP" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

In my experience, every project goes through a "trial-by-fire" at some point in development, and for me, this leg of the project was certainly it. My philosophy about UI tends to be, "If I'm going to do it, then I'm going to do it correctly and as cleanly as possible." Now, the UI code that we produced in this section was very robust, and I could probably write signatures and bind events to delegates in my sleep at this point, but when it came to actually constructing the UI with all of our subwidgets in the UMG editor... *the instructor and I have very different ideas of "clean"*. There was no end to the Wrap Boxes and Spacer widgets, and while I did my best to clean it up as I went along, polishing the layout of these widgets is definitely going on my list of TODOs. However, the main goal of the course is to learn GAS, not UI, and the rest of the course has been excellent so far, so I won't knock it too much.

Building this menu forced me to slow down, understand how the systems were wired together, and think more intentionally about how I want my code and UI to interact in future projects. It also made me realize just how often UIs in tutorials are treated as an afterthought, even when they’re doing heavy lifting for gameplay systems. 

I’m glad I stuck with it. There’s still polish work to be done, especially on the layout side, but the functional groundwork is solid. Above all else, it was a learning experience, and I'm ready to get to the rest of the course: making more cool abilities and exploring what GAS has to offer. 

Here's a simplified breakdown of how the menu works (flowcharts can be expanded in upper right corner):
```mermaid
---
title: When Ability is Clicked
---
flowchart LR
	subgraph WBP_SpellGlobe_Button
	direction LR
		START([Click])
		a1{Button already selected?}
		a2[Deselect self]
	end
	subgraph SpellMenuWidgetController
		b1[Fetch ability descriptions from AbilitySystemComponent]
		b2[Determine Equip and SpendPoint eligibility]
		b3[Broadcast Spell Globe Selected]
	end
	subgraph WBP_SpellMenu
		c1[Enable/Disable Equip and SpendPoints buttons]
		c2[Set Descriptions in Rich Text widgets]
		END([End])
	end

	START--->a1
	a1-- yes -->a2
	a1-- no -->b1
	b1--->b2--->b3
	b3-.->c1
	c1--->c2--->END
```

```mermaid
---
title: When Spend Point is Clicked
---
flowchart LR
	subgraph WBP_SpellMenu
		START([Click])
		a4[Get Spell Menu Widget Controller]
		a1[Enable/Disable Equip and SpendPoints buttons]
		a2[Set Descriptions in Rich Text widgets]
		a3[Set SpellPoints Value widget to new value]
	end
	subgraph SpellMenuWidgetController
		b1[Get Ability System Component]
		b2{Ability == SelectedAbility?}
		b3[Determine Equip and SpendPoint eligibility]
		b4[Broadcast Spell Globe Selected]
		b5[Broadcast Spell Points Changed]
	end
	subgraph AbilitySystemComponent
		subgraph rpc [Server RPC Change Spell Points]
			c1[Get Player State]
			c2{Ability Status == Eligible?}
			c3[Change Status to Unlocked]
			c4{Ability Status == Equipped or Unlocked?}
			c5[Increment Ability Level]
			c6[Broadcast Ability Status Changed]
			c7[Mark Ability Spec Dirty]
		end
	end
	subgraph PlayerState
		d1[Decrement SpellPoints]
		d2[Broadcast On Spell Points Changed]
	end

	START--->a4
	a4--->b1
	b1--->rpc
	c1--->d1
	d1--->d2
	d2-.->b5
	b5-.->a3
	b5--->b2
	b2-- yes -->b3
	b3--->b4
	b4-.->a1
	a1--->a2
	c1--->c2
	c2-- yes -->c3
	c3--->c6--->c7
	c6-.->b2
	c2-- no -->c4
	c4-- yes -->c5
	c5--->c6
	c4-- no -->c6
	
```

```mermaid
---
title: When Equip is Clicked
---
flowchart LR
	subgraph WBP_SpellMenu
		START([Click])
		a4[Get Spell Menu Widget Controller]
		a1{Ability Type?}
		a2[Animate Passive Select]
		a3[Animate Offensive Select]
	end
	subgraph SpellMenuWidgetController
		b1[Broadcast Wait For Equip Selection]
		b2{AbilitySelected Status == Equipped?}
		b3[Set SelectedSlot to SelectedAbility]
	end

	START--->a4
	a4--->b1
	b1--->b2
	b2-- yes -->b3
	b1-.->a1
	a1-- Passive -->a2
	a1-- Offensive -->a3
```

```mermaid
---
title: When Input Slot is Clicked
---
flowchart LR
	subgraph WBP_EquippedRow_Button
		START([Click])
		a1[Get Spell Menu Widget Controller]
		a2[Set Icon and Background Brushes]
	end
	subgraph SpellMenuWidgetController
		b1{Waiting for equip?}
		b2{Ability Type == Slot Type?}
		b3[Get Ability System Component]
		b4[Broadcast Ability Info]
		b5[Broadcast Stop Waiting For Equip]
		b6[Broadcast Spell Globe Reassigned]
	end
	subgraph AbilitySystemComponent
		subgraph rpc1 [Server RPC Equip Ability]
			c1{Status == Equipped or Unlocked?}
			c2[Clear Abilities of Slot Input Tag]
			c3[Clear Ability's current Slot]
			c4[Add new Input Tag to Ability]
			c5{Status == Unlocked?}
			c6[Change Status to Equipped]
			c7[Mark Ability Spec Dirty]
		end
		subgraph rpc2 [Client RPC Equip Ability]
			d1[Broadcast Ability Equipped]
		end
	end
	subgraph WBP_SpellMenu
		e1[End Select Animation]
	end
	subgraph WBP_SpellGlobe_Button
		f1[Deselect Self]
	end

	START--->a1
	a1--->b1
	b1-- yes -->b2
	b2-- yes -->b3
	b3-->rpc1
	c1-- yes -->c2
	c2--->c3--->c4--->c5
	c5-- yes -->c6
	c6--->c7
	c5-- no -->c7
	c7--->rpc2
	c1-- no -->rpc2
	d1-.->b4
	b4--->b5--->b6
	b4-.->a2
	b5-.->e1
	b6-.->f1
```
