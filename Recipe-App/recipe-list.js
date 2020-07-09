const counter = () =>  {
    let count = 0;
    return () => {
        count += 1;
        return count;
    };
};
const nextId = counter();

const recipes = {
    "00" : {
        title : "Cajun-Style Breakfast Sandwhich",
        author : "Gordan Ramsey",
        ingredients : [
            "1 Croissant",
            "1 Egg",
            "3 Oz Tsso Ham thinly sliced",
            "Butter",
            "Old Bay Seasoning",
            "Olive Oil",
            "2 Pieces of Romaine Lettuce",
            "3 Slices of Tomato",
            "1 Slice Cheddar Cheese",
            "Salt"                             
        ],
        instructions : [
            "Heat pan to high heat. Add teaspoon of olive olive and salt the pan. Add sliced croissant slice side down until nice browned then flip and toast. Soak up the salt before you remove from pan when toasted.", 
            "Turn heat to medium-high heat and add ham. Add a touch of pepper and old bay as it cooks in pan. Remove from pan on to plate or bowl with a paper towel. Keep the drippings in the pan.", 
            "Add tablespoon of olive oil and two knobs of butter into pan. Season the butter with a pinch of old bay. Once butter mixture is browned, crack and add egg. Take pan off heat so that egg cooks evenly. Add a touch of old bay on top of egg that's frying. As it cooks,  you can lightly baste the egg with the butter sauce in pan to further cook.",
            "While the egg cooks, add mayo, hot sauce and a touch of old bay. Squeeze the lemon as well and mix. You can add as little or as much hot sauce as you see fit!",
            "On plate, put the bottom of croissant and put a thin layer of mayonnaise, followed a layer of lettuce, tomato and cheese. Put a layer of mayo on top of the cheese and add the tasso on top of that followed by the fried egg. Put a dash more mayo around egg and top with your other layer of the croissant!"
        ]    
    },
    "000" : {
        title : "Crème Caramel",
        author : "Reece Hignell",
        ingredients : [
            "1 cup caster sugar",
            "¼ cup water",
            "3 egg yolks",
            "1 egg",
            "110g caster sugar",
            "250g milk",
            "250g thickened cream",
            "1 vanilla bean, split lengthways"
        ],
        instructions : [
            "Preheat oven to 150C.",
            "For the Caramel, lightly grease six 9cm diameter x 2cm deep tartlet tins. Place the sugar and water into a saucepan then cook over high until sugar starts to caramelise. Swirl the pan until sugar has melted evenly and forms a dark caramel.",
            "Remove from heat and pour caramel evenly into tins. Set aside in a deep baking dish.",
            "For the Custard, place egg yolks, egg and sugar into a saucepan and mix well to combine. Add the milk, cream and vanilla and whisk until smooth. Place over medium heat and stir with a silicone spatula until mixture reaches 80C. Remove from the heat. Pour mixture through a fine sieve into a jug then pour into the tartlet tins.",
            "Pour boiling water into baking dish until halfway up the side of the tins. Carefully transfer to the oven and bake until set but still slightly wobbly in the centres, about 45 minutes. Remove from the oven and allow to cool slightly.",
            "Transfer tins onto a tray and place into the fridge to set. Invert into shallow bowls to serve."
        ]
    },

    "0000" : {
        title : "Quick Asian fishcakes",
        author : "Jamie Oliver",
        ingredients : [
            "1 stick of lemongrass",
            "6cm piece ginger",
            "1/2 bunch of fresh coriander (15g)",
            "500g skinless salmon fillets, skin off, from sustainable sources, pin-boned",
            "1 tbs chilli jam"
        ],
        instructions : [
            "Whack the lemongrass against your work surface and remove the tough outer layer.", 
            "Peel the ginger, then very finely chop with the inside of the lemongrass and most of the coriander, stalks and all, reserving a few nice leaves in a bowl of cold water.",
            "Chop the salmon into 1cm chunks over the mix on your board, then push half the salmon to one side.",
            "Chop the rest until super-fine, almost like a puree, then mix the chunkier bits back through it and season with sea salt and black pepper.", 
            "Divide into 4, then shape and squash into 2cm-thick patties.",
            "Place a large non-stick frying pan on a medium-high heat with 1 tbs of olive oil. Cook the patties for 2 minutes on each side, or until nicely golden.",
            "Spoon the chilli jam over the fishcakes, add a splash of water to the pan, turn the heat off, and jiggle to coat. Serve sprinkled with the drained coriander"
        ]
    }
};



module.exports = {
    recipes,
    nextId,
};