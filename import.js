// Insert 40 sample posts, 4 are on hold
db.articles.drop();
db.pages.drop();
db.users.drop();

var summary = '<p>Bacon ipsum dolor sit amet esse duis pastrami anim, pancetta fatback capicola officia tenderloin.</p><p>Meatloaf culpa ut, bacon sed sausage jerky cillum est ham ad laboris ham hock dolore. Venison ut enim, aliqua elit frankfurter et incididunt consequat culpa nostru aliqua elit pancetta.</p>',
	description = '<p>Bacon ipsum dolor sit amet bacon turkey brisket ball tip rump bresaola pastrami.  Tenderloin tongue pork belly, capicola jerky turkey drumstick.  Boudin bacon pancetta shoulder meatball.  Swine frankfurter sausage, leberkas andouille beef tri-tip.  Meatball ham salami tenderloin cow corned beef swine kielbasa bacon bresaola.  Kevin turducken brisket, drumstick ribeye strip steak jowl leberkas.  Shoulder corned beef beef ribs, bacon ribeye kielbasa sausage ball tip pork loin biltong tail salami turkey andouille.</p><p>Short loin leberkas swine ribeye chicken turducken.  Pork chop ball tip ham hock, leberkas boudin flank pork belly beef kielbasa.  Ribeye doner t-bone chuck tri-tip sausage pork belly beef brisket corned beef salami turkey swine.  Short loin brisket spare ribs, ham beef ribs flank drumstick beef ham hock chuck cow salami.  Tenderloin pork loin meatball rump.</p><p>Sirloin bresaola sausage andouille rump pancetta shoulder hamburger jowl flank ham pork ham hock.  Frankfurter ribeye pork loin bresaola tri-tip beef ribs doner meatloaf sausage shankle.  Capicola biltong tri-tip tongue pork prosciutto bresaola leberkas shoulder ribeye pork chop rump pig frankfurter.  Leberkas andouille meatloaf kevin swine tri-tip shankle, pork doner filet mignon spare ribs ground round chuck.</p><p>Chuck jerky beef, ball tip short loin rump capicola.  Spare ribs drumstick tenderloin sausage.  Turducken capicola jerky, kevin corned beef beef bacon pancetta short ribs filet mignon chuck salami andouille sirloin pork belly.  Venison ham pork chop pork, rump pastrami pork loin jowl strip steak turducken chuck shankle.  Meatloaf leberkas ham hock ball tip flank kielbasa.</p><p>Salami pork belly tenderloin turducken meatloaf ribeye prosciutto fatback.  Ham hock ground round turducken, tri-tip andouille chicken beef corned beef pork belly t-bone boudin drumstick biltong.  Boudin tail venison drumstick leberkas fatback, filet mignon rump pork shoulder flank pork loin.  Shank turducken swine jerky, pork chop pork belly biltong.  Corned beef meatball tongue pancetta brisket drumstick.  Ground round corned beef pork chop tenderloin doner pork loin hamburger pork belly.</p>';

for (var i = 1; i <= 4; i++) {
	db.articles.insert( 
		[
			{ name : 'short-loin-leberkas-swin-' + i, heading: 'Short loin leberkas swin', status: 1, publishDate: new Date(), author: 'Beesden', description: description, summary: summary, tags: [{name: 'bacon', heading: 'bacon'}, {name: 'beef', heading: 'beef'}, {name: 'eggs', heading: 'eggs'}]},
			{ name : 'chuck-jerky-beef-' + i, heading: 'Chuck jerky beef,', status: 1, publishDate: new Date(), author: 'Dave', description: description, summary: summary, tags: [{name: 'bacon', heading: 'bacon'}, {name: 'sasages', heading: 'sasages'}, {name: 'eggs', heading: 'eggs'}] },
			{ name : 'hamburger-jowl-flank-' + i, heading: 'hamburger jowl flank', status: 1, publishDate: new Date(), author: 'Beesden', description: description, summary: summary , tags: [{name: 'donuts', heading: 'donuts'}, {name: 'cow', heading: 'cow'}, {name: 'eggs', heading: 'eggs'}]},
			{ name : 'prosciutto-fatback-ham-' + i, heading: 'prosciutto fatback. Ham', status: 1, publishDate: new Date(), author: 'Beesden', description: description, summary: summary, tags: [{name: 'bacon', heading: 'bacon'}, {name: 'elephant', heading: 'elephant'}, {name: 'Howard', heading: 'Howard'} ]},
			{ name : 'etta-brisket-drumstick-' + i, heading: 'etta brisket drumstick', status: 1, publishDate: new Date(), author: 'Beesden', description: description, summary: summary, tags: [{name: 'testicles', heading: 'testicles'}, {name: 'beef', heading: 'beef'}, {name: 'fruit', heading: 'fruit'} ]},
			{ name : 'capicola-biltong-tri-tip-' + i, heading: 'Capicola biltong tri-tip', status: 1, publishDate: new Date(), author: 'Howard', description: description, summary: summary, tags: [{name: 'fruit', heading: 'fruit'}, {name: 'sausages', heading: 'sausages'}, {name: 'eggs', heading: 'eggs'} ]},
			{ name : 'spare-ribs-drumstick-tenderloin-' + i, heading: 'Spare ribs drumstick tenderloin', status: 1, publishDate: new Date(), author: 'Beesden', description: description, summary: summary, tags: [{name: 'bacon', heading: 'bacon'}, {name: 'beef', heading: 'beef'}, {name: 'eggs', heading: 'eggs'} ]},
			{ name : 'ground-round-corned-beef-' + i, heading: 'Ground round corned beef', status: 1, publishDate: new Date(), author: 'Beesden', description: description, summary: summary, tags: [{name: 'flour', heading: 'flour'}, {name: 'milk', heading: 'milk'}, {name: 'eggs', heading: 'eggs'} ]},
			{ name : 'shoulder-corned-beef-beef-ribs-' + i, heading: 'Shoulder corned beef beef ribs', status: 1, publishDate: new Date(), author: 'Beesden', description: description, summary: summary, tags: [{name: 'flour', heading: 'flour'}, {name: 'testicles', heading: 'testicles'}, {name: 'eggs', heading: 'eggs'} ]},
			{ name : 'frankfurter-ribeye-pork-' + i, heading: 'Frankfurter ribeye pork', status: 2, publishDate: new Date(), author: 'Beesden', description: description, summary: summary }
		]
	)
};

// Content pages
db.pages.insert( 
	[
		{ name : 'about', title: 'About', heading: 'About our blog', pageOrder: 2, content: "<p><cite>He's just a guy, you know.</cite></p><p>Welcome to my blog! By now you must have realised I'm a pretty great guy, to be writing about my culinary experiences in such tasty details!</p>"},
		{ name : 'contact', title: 'Contact', heading: 'Contact Form', pageOrder: 3, content: "<p>If you want to ask us anything, comment on one of out blog posts, or have a general recommendation, let us know by filling out our enquiry form.</p>"},
		{ name : 'confirmation', title: 'Confirmation', heading: 'Enquiry sent', pageOrder: 0, content: "<p><strong>Thank you for your message.</strong></p><p>We'll make very effort to respond within the next 24-48 hours or sooner.</p>"}
	]
);

db.users.insert(
	[
		{name: 'Beesden', email: 'beesden@gmail.com', username : 'admin', password: 'password' },
		{name: 'Howard', email: 'howard@howard.com', username : 'howard', password: 'password'	},
		{name: 'Dave', email: 'dave@dave.com', username : 'dave', password: 'password'	},
	]
)