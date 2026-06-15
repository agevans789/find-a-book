# find-a-book
So using a book API, I want to create a single-page web app that will recommend a person a book

So there are a few ways this will happen. The first is through the use of cookies-- building on people's stated preferences to recommend a similar thing. Or something that has a similar element that they liked.

But sometimes you don't just want to read the same thing, you want to discover something that you've never thought to pick up before-- or something that can help you solve a problem/give you a piece of information that you were looking for, without knowing ahead of time that that was what you were looking for.

So the key becomes breaking down each of the items coming from the API numerically, so far as they meet certain criteria. Some of this would be subjective-- judging how much something is like something else. That's where the different levels of mood/writing style are used. 

To measure this empirically, I think I want to start parsing language, literary style, keywords, sentence length, dependent clauses, etc. A book gets a rating in each category (need to figure out what each of the categories are and what their metrics are) and then I need to figure out how all those individual ratings get combined into a total score.

To make a judgment about person x's profile and say that they need to be set on a course of y, you first need to ajudge what 

The issue is going to be that the profile score will have to be split along genre, and even within genre you don't want to get the criteria muddled. We'll mark that it's a specific genre, but that is not the most important thing.

To test this I am going to use the case of someone loving something that they never would have thought of (Project Hail Mary). 

I like the idea of doing an html/css bookshelf with each of the different books representing a different profile. 

And then when a book recommendation comes up, it also needs to have its "stats" (not like the algorithmic numbers, but like you would like this because x y and z)
