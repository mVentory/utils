# Awesome Checklist

This is a simple WordPress plugin to convert UL/LI lists into practicaal re-usable checklists.

The lists are prepared inside wordpress posts as a simple UL/LI list. The JS in the front end reads the DOM, converts bullets into checkboxes, saves the changes into cookies and restores the previous state on page reload.

## Usage

1. Add `class="mvchecklist"` to the `UL` element.
2. Add a unique `id` attribute to every `LI` element that should be converted into a check box.
3. Multiple `UL` checklists are allowed per page

## Data retention

The state of every checkbox is stored on the client side in a long lived cookie.

## Example

```
This is my test checklist because it has class="mvchecklist".

<ul class="mvchecklist">
	<li id="1">1</li>
	<li id="2">2</li>
	<li id="3">3</li>
	<li id="4">4</li>
	<li id="5">5</li>

</ul>

and then it continues after some text

<ul class="mvchecklist">
	<li id="6">6</li>
	<li id="7">7</li>
</ul>

This is a non-checklist because it DOESN'T have class="mvchecklist"

<ul class="non-checklist">
	<li id="8">a</li>
	<li id="9">b</li>
</ul>
```






