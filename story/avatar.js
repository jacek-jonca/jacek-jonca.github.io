let libmoji = require("./node_modules/libmoji/build/index.js");

let comicId = 10218329;
let avatarId = "99195964866_3-s5";
let transparent = 1;
let scale = 4;
let outfit = 889233;

console.log(libmoji.buildRenderUrl(comicId,avatarId,transparent,scale,outfit));

/*

Needs pupil tone:
https://preview.bitmoji.com/avatar-builder-v3/preview/body?gender=1&style=5&outfit=889233&skin_tone=16691590&hair=1656&hair_tone=7164990&pupil_tone=7448799

Comic strips: (transparent, palette, width)
https://render.bitstrips.com/v2/cpanel/:comic_id-%s-v1.png?option1&option2&...
console.log(libmoji.buildCpanelUrl(comicId,avatarId,1,2));

Avatars:
https://render.bitstrips.com/render/:comic_id/%s-v1.png?option1&option2&...

My AvatarID:
99195964866_3-s5

Options:

POSITION: 0 - front, also try 1 and 7 for more profile
head_rotation=1
body_rotation=1

cropped=%22body%22
cropped=%22head%22

width=500

My outfits

Default, blue suit, brown shoes, white shirt, no tie
outfit=889233

Black suit, white shirt, tie 
outfit=889224

Gray suit, white shirt, red tie
outfit=889219

Light suit, tie
outfit=889222

Casual, dog t-shirt
outfit=986557

COMIC:

Happy Headshot
https://render.bitstrips.com/v2/cpanel/10212371-

Neutral Headshot
https://render.bitstrips.com/render/10220143/99195964866_3-s5-v3.png?transparent=1&scale=2&outfit=889233&head_rotation=0

Facts
https://render.bitstrips.com/v2/cpanel/10216499-

Beach
https://render.bitstrips.com/v2/cpanel/10211857-

Bean bag
https://render.bitstrips.com/v2/cpanel/10217979-

Swimsuit Sports Illustrated
https://render.bitstrips.com/v2/cpanel/9669304-

Shark sea water skis
https://render.bitstrips.com/v2/cpanel/10211670-

Fishing:
https://render.bitstrips.com/v2/cpanel/10211669-

Surfing:
https://render.bitstrips.com/v2/cpanel/10211505-

Healthy living
https://render.bitstrips.com/v2/cpanel/9936824-

Award:
https://render.bitstrips.com/v2/cpanel/10215362-

Education:
https://render.bitstrips.com/v2/cpanel/9991041-

Analytics, math, data
https://render.bitstrips.com/v2/cpanel/10219138-

*** For GALLERY see: ***
https://github.com/JoshCheek/bitmoji


*** Sample Avatars ***

happy, very smiling, moon eyes
https://render.bitstrips.com/render/10219348/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

happy, smiling, moon eyes
https://render.bitstrips.com/render/10212371/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

happy, smiling, moon eyes
https://render.bitstrips.com/render/10219135/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

happy, very smiling, big eyes
https://render.bitstrips.com/render/10212025/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

half-smile, looking right, big eyes
https://render.bitstrips.com/render/10212368/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

half-smile, looking left, big eyes
https://render.bitstrips.com/render/10212367/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

half-smile, looking straight, big eyes
https://render.bitstrips.com/render/10220143/99195964866_3-s5-v3.png?transparent=1&scale=4&outfit=889233&head_rotation=0&body_rotation=0

right-wink, O mouth
https://render.bitstrips.com/render/10212029/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

right-wink, half-smile
https://render.bitstrips.com/render/10212044/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

half-smile, eyes closed
https://render.bitstrips.com/render/10219133/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

very smiling, eyes closed
https://render.bitstrips.com/render/10218905/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

neutral, big eyes, looking straight
https://render.bitstrips.com/render/10212038/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

unhappy, mad
https://render.bitstrips.com/render/10212034/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

silenced, muffled, zippered
https://render.bitstrips.com/render/10214008/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4

neutral, big eyes, looking left-top, thinking
https://render.bitstrips.com/render/10212047/99195964866_3-s5-v1.png?transparent=1&palette=&scale=4

neutral, moon eyes, left profile
https://render.bitstrips.com/render/10219138/99195964866_3-s5-v1.png?transparent=1&palette=1&scale=4



 */