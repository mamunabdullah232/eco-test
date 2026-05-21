const q = (en, as, options, answer) => ({ en, as, options, answer });
const o = (en, as) => ({ en, as });
const slugifyTest = value => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const makeSetId = (chapterTitle, testNumber) =>
  ["Class 10", "Social Science", "History", chapterTitle, "Test " + testNumber].map(slugifyTest).join("__");

const historyChapters = [
  {
    title: {
      en: "Chapter 1 - Partition of Bengal and Swadeshi Movement",
      as: "অধ্যায় ১ - বংগ বিভাজন আৰু স্বদেশী আন্দোলন"
    },
    questions: [
      q("During whose reign did the Partition of Bengal take place?", "বংগ বিভাজন কাৰ শাসনকালত সংঘটিত হৈছিল?", [o("Lord Dalhousie", "লৰ্ড ডালহৌছি"), o("Lord Curzon", "লৰ্ড কাৰ্জন"), o("Lord Minto", "লৰ্ড মিন্টো"), o("Lord Ripon", "লৰ্ড ৰিপন")], 1),
      q("The Partition of Bengal was implemented on-", "বংগ বিভাজন কেতিয়া কাৰ্যকৰী কৰা হৈছিল?", [o("7 August 1905", "৭ আগষ্ট, ১৯০৫"), o("19 July 1905", "১৯ জুলাই, ১৯০৫"), o("16 October 1905", "১৬ অক্টোবৰ, ১৯০৫"), o("30 December 1906", "৩০ ডিচেম্বৰ, ১৯০৬")], 2),
      q("What was the name of the new province created after the Partition of Bengal?", "বংগ বিভাজনৰ পিছত সৃষ্টি হোৱা নতুন প্ৰদেশখনৰ নাম কি আছিল?", [o("Bengal and Bihar", "বংগ আৰু বিহাৰ"), o("Eastern Bengal and Assam", "পূব বংগ আৰু অসম"), o("Assam and Orissa", "অসম আৰু উৰিষ্যা"), o("West Bengal and Assam", "পশ্চিম বংগ আৰু অসম")], 1),
      q("What was the capital of Eastern Bengal and Assam?", "পূব বংগ আৰু অসমৰ ৰাজধানী কি আছিল?", [o("Shillong", "শ্বিলং"), o("Calcutta", "কলকাতা"), o("Dhaka", "ঢাকা"), o("Chattagram", "চট্টগ্ৰাম")], 2),
      q("Who submitted the plan for the Partition of Bengal to Lord Curzon on 28 March 1903?", "১৯০৩ চনৰ ২৮ মাৰ্চত লৰ্ড কাৰ্জনৰ ওচৰত বংগ বিভাজনৰ পৰিকল্পনা কোনে দাখিল কৰিছিল?", [o("Andrew Fraser", "এণ্ড্ৰিউ ফ্ৰেজাৰ"), o("Lord Minto", "লৰ্ড মিন্টো"), o("Lord Morley", "লৰ্ড মৰ্লে"), o("R. H. Keatings", "আৰ. এইচ. কীটিংছ")], 0),
      q("The Risley Papers were related to-", "ৰিজলি পেপাৰছ কিহৰ সৈতে জড়িত আছিল?", [o("Non-Cooperation Movement", "অসহযোগ আন্দোলন"), o("Partition of Bengal", "বংগ বিভাজন"), o("Quit India Movement", "ভাৰত ত্যাগ আন্দোলন"), o("Civil Disobedience Movement", "আইন অমান্য আন্দোলন")], 1),
      q("The official declaration that the Partition of Bengal would be implemented on 16 October was made on-", "বংগ বিভাজন ১৬ অক্টোবৰতে কাৰ্যকৰী হ'ব বুলি আনুষ্ঠানিক ঘোষণা কেতিয়া কৰা হৈছিল?", [o("1 September 1905", "১ ছেপ্টেম্বৰ, ১৯০৫"), o("7 August 1905", "৭ আগষ্ট, ১৯০৫"), o("30 December 1906", "৩০ ডিচেম্বৰ, ১৯০৬"), o("11 March 1906", "১১ মাৰ্চ, ১৯০৬")], 0),
      q("Which movement began as a protest against the Partition of Bengal?", "বংগ বিভাজনৰ বিৰুদ্ধে কোনটো আন্দোলন আৰম্ভ হৈছিল?", [o("Khilafat Movement", "খিলাফত আন্দোলন"), o("Swadeshi Movement", "স্বদেশী আন্দোলন"), o("Individual Satyagraha", "ব্যক্তিগত সত্যাগ্ৰহ"), o("Quit India Movement", "ভাৰত ত্যাগ আন্দোলন")], 1),
      q("The Swadeshi Movement encouraged Indians mainly to-", "স্বদেশী আন্দোলনে ভাৰতীয়সকলক মূলতঃ কি কৰিবলৈ উৎসাহিত কৰিছিল?", [o("use foreign goods", "বিদেশী সামগ্ৰী ব্যৱহাৰ কৰিবলৈ"), o("boycott foreign goods and use indigenous goods", "বিদেশী সামগ্ৰী বৰ্জন কৰি স্বদেশী সামগ্ৰী ব্যৱহাৰ কৰিবলৈ"), o("support British rule", "বৃটিছ শাসন সমৰ্থন কৰিবলৈ"), o("join the British army", "বৃটিছ সেনাত যোগদান কৰিবলৈ")], 1),
      q("Who wrote the article Bangar Sarbanash?", "বংগৰ সৰ্বনাশ প্ৰবন্ধটো কোনে লিখিছিল?", [o("Rabindranath Tagore", "ৰবীন্দ্ৰনাথ ঠাকুৰ"), o("Krishna Kumar Mitra", "কৃষ্ণকুমাৰ মিত্ৰ"), o("Bipin Chandra Pal", "বিপিনচন্দ্ৰ পাল"), o("Aurobindo Ghose", "অৰবিন্দ ঘোষ")], 1),
      q("Where was the first protest meeting against the proposed Partition of Bengal held?", "বংগ বিভাজনৰ প্ৰস্তাৱৰ বিৰুদ্ধে প্ৰথম প্ৰতিবাদী সভা ক'ত অনুষ্ঠিত হৈছিল?", [o("Dhaka", "ঢাকা"), o("Khulna", "খুলনা"), o("Calcutta", "কলকাতা"), o("Pabna", "পাবনা")], 1),
      q("On 16 October 1905, Bengal observed-", "১৬ অক্টোবৰ, ১৯০৫ তাৰিখে বংগত কি পালন কৰা হৈছিল?", [o("Independence Day", "স্বাধীনতা দিৱস"), o("National Mourning Day", "ৰাষ্ট্ৰীয় শোক দিৱস"), o("Republic Day", "গণৰাজ্য দিৱস"), o("Victory Day", "বিজয় দিৱস")], 1),
      q("Who called upon the people of Calcutta to observe Rakhibandhan on 16 October 1905?", "১৬ অক্টোবৰ, ১৯০৫ তাৰিখে কলকাতাৰ লোকসকলক ৰাখীবন্ধন পালন কৰিবলৈ কোনে আহ্বান জনাইছিল?", [o("Surendranath Banerjee", "সুৰেন্দ্ৰনাথ বেনাৰ্জী"), o("Rabindranath Tagore", "ৰবীন্দ্ৰনাথ ঠাকুৰ"), o("Dadabhai Naoroji", "দাদাভাই নৌৰোজী"), o("Lala Lajpat Rai", "লালা লাজপত ৰায়")], 1),
      q("Who laid the foundation stone of Federal Hall on 16 October 1905?", "১৬ অক্টোবৰ, ১৯০৫ তাৰিখে ফেডাৰেল হলৰ আধাৰশিলা কোনে স্থাপন কৰিছিল?", [o("Ananda Mohan Bose", "আনন্দ মোহন বসু"), o("Aurobindo Ghose", "অৰবিন্দ ঘোষ"), o("Abdul Rasul", "আব্দুল ৰছুল"), o("Bipin Chandra Pal", "বিপিনচন্দ্ৰ পাল")], 0),
      q("Which society was formed to disobey the Carlyle Circular?", "কাৰ্লাইল চাৰ্কুলাৰৰ বিৰুদ্ধে কোনটো সংগঠন গঠন কৰা হৈছিল?", [o("Dawn Society", "ডন ছ'চাইটি"), o("Anti-Circular Society", "এণ্টি-চাৰ্কুলাৰ ছ'চাইটি"), o("Muslim League", "মুছলিম লীগ"), o("Indian Association", "ইণ্ডিয়ান এছ'চিয়েছন")], 1),
      q("Who was the first principal of Bengal National College?", "বেঙ্গল নেশ্যনেল কলেজৰ প্ৰথম অধ্যক্ষ কোন আছিল?", [o("Satish Chandra Mukherjee", "সতীশচন্দ্ৰ মুখাৰ্জী"), o("Aurobindo Ghose", "অৰবিন্দ ঘোষ"), o("Rabindranath Tagore", "ৰবীন্দ্ৰনাথ ঠাকুৰ"), o("Rasbihari Bose", "ৰাসবিহাৰী বসু")], 1),
      q("Bengal Chemicals was started by-", "বেঙ্গল কেমিকেলছ কোনে আৰম্ভ কৰিছিল?", [o("Prafulla Chandra Ray", "প্ৰফুল্লচন্দ্ৰ ৰায়"), o("Jamshedji Tata", "জামশেদজি টাটা"), o("Nilratan Sarkar", "নীলৰতন চৰকাৰ"), o("Jagadish Chandra Bose", "জগদীশচন্দ্ৰ বসু")], 0),
      q("All India Muslim League was established in-", "অল ইণ্ডিয়া মুছলিম লীগ কেতিয়া স্থাপন কৰা হৈছিল?", [o("1905", "১৯০৫"), o("1906", "১৯০৬"), o("1909", "১৯০৯"), o("1911", "১৯১১")], 1),
      q("All India Muslim League was established at-", "অল ইণ্ডিয়া মুছলিম লীগ ক'ত স্থাপন কৰা হৈছিল?", [o("Calcutta", "কলকাতা"), o("Dhaka", "ঢাকা"), o("Lucknow", "লক্ষ্ণৌ"), o("Bombay", "বোম্বাই")], 1),
      q("The Partition of Bengal was repealed in-", "বংগ বিভাজন কেতিয়া বাতিল কৰা হৈছিল?", [o("1906", "১৯০৬"), o("1909", "১৯০৯"), o("1911", "১৯১১"), o("1919", "১৯১৯")], 2)
    ]
  },
  {
    title: {
      en: "Chapter 2 - Rise of Gandhi and the Freedom Movement of India",
      as: "অধ্যায় ২ - গান্ধীৰ উত্থান আৰু ভাৰতৰ স্বাধীনতা আন্দোলন"
    },
    questions: [
      q("Mahatma Gandhi was born at-", "মহাত্মা গান্ধীৰ জন্ম ক'ত হৈছিল?", [o("Ahmedabad", "আহমেদাবাদ"), o("Porbandar", "পোৰবন্দৰ"), o("Rajkot", "ৰাজকোট"), o("Bombay", "বোম্বাই")], 1),
      q("Mahatma Gandhi was born on-", "মহাত্মা গান্ধীৰ জন্ম কেতিয়া হৈছিল?", [o("2 October 1869", "২ অক্টোবৰ, ১৮৬৯"), o("15 August 1869", "১৫ আগষ্ট, ১৮৬৯"), o("26 January 1869", "২৬ জানুৱাৰী, ১৮৬৯"), o("10 March 1869", "১০ মাৰ্চ, ১৮৬৯")], 0),
      q("Gandhi went to South Africa in-", "গান্ধী দক্ষিণ আফ্ৰিকালৈ কোন চনত গৈছিল?", [o("1888", "১৮৮৮"), o("1891", "১৮৯১"), o("1893", "১৮৯৩"), o("1915", "১৯১৫")], 2),
      q("Which organization did Gandhi found in South Africa?", "দক্ষিণ আফ্ৰিকাত গান্ধীয়ে কোনটো সংগঠন স্থাপন কৰিছিল?", [o("Natal Indian Congress", "নাটাল ইণ্ডিয়ান কংগ্ৰেছ"), o("Indian National Congress", "ইণ্ডিয়ান নেশ্যনেল কংগ্ৰেছ"), o("Muslim League", "মুছলিম লীগ"), o("Harijan Sevak Sangh", "হৰিজন সেৱক সংঘ")], 0),
      q("Gandhi's newspaper in South Africa was called-", "দক্ষিণ আফ্ৰিকাত গান্ধীৰ বাতৰি কাকতখনৰ নাম কি আছিল?", [o("Young India", "ইয়ং ইণ্ডিয়া"), o("Indian Opinion", "ইণ্ডিয়ান অপিনিয়ন"), o("Harijan", "হৰিজন"), o("Kesari", "কেশৰী")], 1),
      q("Gandhi first used the weapon of Satyagraha in-", "গান্ধীয়ে সত্যাগ্ৰহৰ অস্ত্ৰ প্ৰথমে ক'ত ব্যৱহাৰ কৰিছিল?", [o("India", "ভাৰতত"), o("South Africa", "দক্ষিণ আফ্ৰিকাত"), o("England", "ইংলেণ্ডত"), o("Burma", "বাৰ্মাত")], 1),
      q("The Rowlatt Act was passed in-", "ৰাওলাট আইন কোন চনত গৃহীত হৈছিল?", [o("1917", "১৯১৭"), o("1918", "১৯১৮"), o("1919", "১৯১৯"), o("1920", "১৯২০")], 2),
      q("The Rowlatt Committee was chaired by-", "ৰাওলাট কমিটিৰ সভাপতি কোন আছিল?", [o("Justice Sydney Rowlatt", "ন্যায়াধীশ ছিডনী ৰাওলাট"), o("Lord Hunter", "লৰ্ড হান্টাৰ"), o("Lord Irwin", "লৰ্ড আৰউইন"), o("Sir John Simon", "ছাৰ জন চাইমন")], 0),
      q("The Rowlatt Act authorized the government to-", "ৰাওলাট আইনে চৰকাৰক কি ক্ষমতা দিছিল?", [o("give complete freedom to Indians", "ভাৰতীয়সকলক সম্পূৰ্ণ স্বাধীনতা দিবলৈ"), o("imprison any person without trial", "বিচাৰ নকৰাকৈ যিকোনো ব্যক্তিক কাৰাবন্দী কৰিবলৈ"), o("abolish land revenue", "ভূমি ৰাজহ বিলোপ কৰিবলৈ"), o("form elected ministries", "নিৰ্বাচিত মন্ত্ৰীসভা গঠন কৰিবলৈ")], 1),
      q("The hartal against the Rowlatt Act was launched on-", "ৰাওলাট আইনৰ বিৰুদ্ধে হৰতাল কেতিয়া আৰম্ভ কৰা হৈছিল?", [o("6 April 1919", "৬ এপ্ৰিল, ১৯১৯"), o("13 April 1919", "১৩ এপ্ৰিল, ১৯১৯"), o("5 February 1922", "৫ ফেব্ৰুৱাৰী, ১৯২২"), o("12 March 1930", "১২ মাৰ্চ, ১৯৩০")], 0),
      q("The Jallianwala Bagh Massacre took place on-", "জালিয়ানৱালা বাগ হত্যাকাণ্ড কেতিয়া সংঘটিত হৈছিল?", [o("10 April 1919", "১০ এপ্ৰিল, ১৯১৯"), o("13 April 1919", "১৩ এপ্ৰিল, ১৯১৯"), o("6 April 1919", "৬ এপ্ৰিল, ১৯১৯"), o("5 May 1930", "৫ মে', ১৯৩০")], 1),
      q("Who ordered firing at Jallianwala Bagh?", "জালিয়ানৱালা বাগত গুলীচালনাৰ আদেশ কোনে দিছিল?", [o("General Dyer", "জেনেৰেল ডায়াৰ"), o("Lord Chelmsford", "লৰ্ড চেমছফৰ্ড"), o("Lord Irwin", "লৰ্ড আৰউইন"), o("Lord Mountbatten", "লৰ্ড মাউণ্টবেটেন")], 0),
      q("Who renounced his Knighthood after the Jallianwala Bagh Massacre?", "জালিয়ানৱালা বাগ হত্যাকাণ্ডৰ পিছত কোনে নিজৰ নাইটহুড উপাধি ত্যাগ কৰিছিল?", [o("Mahatma Gandhi", "মহাত্মা গান্ধী"), o("Rabindranath Tagore", "ৰবীন্দ্ৰনাথ ঠাকুৰ"), o("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু"), o("Subhas Chandra Bose", "সুভাষচন্দ্ৰ বসু")], 1),
      q("The Khilafat Committee was led by-", "খিলাফত কমিটিৰ নেতৃত্ব কোনে দিছিল?", [o("Maulana Shaukat Ali and Mohammad Ali", "মৌলানা শওকত আলী আৰু মহম্মদ আলী"), o("Gandhi and Nehru", "গান্ধী আৰু নেহৰু"), o("Tilak and Gokhale", "তিলক আৰু গোখলে"), o("Jinnah and Liaquat Ali", "জিন্না আৰু লিয়াকত আলী")], 0),
      q("The Non-Cooperation Movement lasted from-", "অসহযোগ আন্দোলন কেতিয়াৰ পৰা কেতিয়ালৈ চলিছিল?", [o("1919-1921", "১৯১৯-১৯২১"), o("1920-1922", "১৯২০-১৯২২"), o("1930-1934", "১৯৩০-১৯৩৪"), o("1940-1942", "১৯৪০-১৯৪২")], 1),
      q("Gandhi suspended the Non-Cooperation Movement after the incident at-", "গান্ধীয়ে কোন ঘটনাৰ পিছত অসহযোগ আন্দোলন স্থগিত ৰাখিছিল?", [o("Dandi", "ডাণ্ডী"), o("Chauri Chaura", "চৌৰীচৌৰা"), o("Lahore", "লাহোৰ"), o("Amritsar", "অমৃতসৰ")], 1),
      q("The Lahore Session of Congress in 1929 declared the goal of-", "১৯২৯ চনৰ কংগ্ৰেছৰ লাহোৰ অধিৱেশনে কোন লক্ষ্য ঘোষণা কৰিছিল?", [o("Dominion Status", "ডমিনিয়ন ষ্টেটাছ"), o("Purna Swaraj", "পূৰ্ণ স্বৰাজ"), o("Separate Electorate", "পৃথক নিৰ্বাচন"), o("Partition", "বিভাজন")], 1),
      q("Gandhi's Salt March began on-", "গান্ধীৰ লৱণ যাত্ৰা কেতিয়া আৰম্ভ হৈছিল?", [o("12 March 1930", "১২ মাৰ্চ, ১৯৩০"), o("6 April 1919", "৬ এপ্ৰিল, ১৯১৯"), o("5 February 1922", "৫ ফেব্ৰুৱাৰী, ১৯২২"), o("8 August 1942", "৮ আগষ্ট, ১৯৪২")], 0),
      q("Who was known as Frontier Gandhi?", "সীমান্ত গান্ধী বুলি কাক জনা যায়?", [o("Khan Abdul Ghaffar Khan", "খান আব্দুল গফ্ফাৰ খান"), o("Subhas Chandra Bose", "সুভাষচন্দ্ৰ বসু"), o("Sardar Patel", "চৰ্দাৰ পেটেল"), o("Rajendra Prasad", "ৰাজেন্দ্ৰ প্ৰসাদ")], 0),
      q("The slogan Do or Die was given during the-", "কৰ বা মৰ শ্লোগানটো কোন আন্দোলনৰ সময়ত দিয়া হৈছিল?", [o("Non-Cooperation Movement", "অসহযোগ আন্দোলন"), o("Civil Disobedience Movement", "আইন অমান্য আন্দোলন"), o("Quit India Movement", "ভাৰত ত্যাগ আন্দোলন"), o("Swadeshi Movement", "স্বদেশী আন্দোলন")], 2)
    ]
  },
  {
    title: {
      en: "Chapter 3 - Anti-British Rising and Peasant Revolts in Assam",
      as: "অধ্যায় ৩ - অসমত বৃটিছ-বিৰোধী উত্থান আৰু কৃষক বিদ্ৰোহ"
    },
    questions: [
      q("The Treaty of Yandaboo was signed on-", "ইয়াণ্ডাবু সন্ধি কেতিয়া স্বাক্ষৰিত হৈছিল?", [o("24 February 1826", "২৪ ফেব্ৰুৱাৰী, ১৮২৬"), o("15 August 1857", "১৫ আগষ্ট, ১৮৫৭"), o("26 February 1858", "২৬ ফেব্ৰুৱাৰী, ১৮৫৮"), o("8 April 1933", "৮ এপ্ৰিল, ১৯৩৩")], 0),
      q("British rule in Assam began after the-", "অসমত বৃটিছ শাসন কিহৰ পিছত আৰম্ভ হৈছিল?", [o("Battle of Plassey", "প্লাছীৰ যুদ্ধ"), o("Treaty of Yandaboo", "ইয়াণ্ডাবু সন্ধি"), o("Partition of Bengal", "বংগ বিভাজন"), o("Lahore Session", "লাহোৰ অধিৱেশন")], 1),
      q("Under the British revenue system, Assamese peasants had to pay revenue mainly in-", "বৃটিছ ৰাজহ ব্যৱস্থাত অসমীয়া কৃষকসকলে ৰাজহ মূলতঃ কিহত দিব লাগিছিল?", [o("crops", "শস্যত"), o("cattle", "গৰু-গাইত"), o("cash", "নগদ ধনত"), o("cloth", "কাপোৰত")], 2),
      q("The Keyas were mainly-", "কীয়াসকল মূলতঃ কোন আছিল?", [o("British soldiers", "বৃটিছ সৈনিক"), o("immigrant Marwari and Bengali businessmen", "বহিৰাগত মাৰোৱাৰী আৰু বঙালী ব্যৱসায়ী"), o("Assamese peasants", "অসমীয়া কৃষক"), o("Ahom princes", "আহোম ৰাজকুমাৰ")], 1),
      q("Slavery in Assam was stopped by the British in-", "অসমত বৃটিছসকলে দাসপ্ৰথা কোন চনত বন্ধ কৰিছিল?", [o("1826", "১৮২৬"), o("1836", "১৮৩৬"), o("1843", "১৮৪৩"), o("1857", "১৮৫৭")], 2),
      q("Moffat Mills came to Assam in-", "মফাট মিলছ অসমলৈ কোন চনত আহিছিল?", [o("1843", "১৮৪৩"), o("1853", "১৮৫৩"), o("1857", "১৮৫৭"), o("1861", "১৮৬১")], 1),
      q("Who led the revolt of 1857 in Assam?", "অসমত ১৮৫৭ চনৰ বিদ্ৰোহৰ নেতৃত্ব কোনে দিছিল?", [o("Gomdhar Konwar", "গোমধৰ কোঁৱৰ"), o("Maniram Dewan", "মণিৰাম দেৱান"), o("Tikendrajit", "টিকেন্দ্ৰজিত"), o("Sambhudhan Kachari", "শম্ভুধন কছাৰী")], 1),
      q("Which Ahom prince did the rebels want to restore to the throne in 1857?", "১৮৫৭ চনৰ বিদ্ৰোহত বিদ্ৰোহীসকলে কোন আহোম ৰাজকুমাৰক সিংহাসনত বহুৱাব বিচাৰিছিল?", [o("Purandar Singha", "পুৰন্দৰ সিংহ"), o("Kandarpeswar Singha", "কন্দর্পেশ্বৰ সিংহ"), o("Kulachandra", "কুলচন্দ্ৰ"), o("Churachandra", "চূড়াচন্দ্ৰ")], 1),
      q("Who was the Bengali Muktiyar who helped Maniram Dewan?", "মণিৰাম দেৱানক সহায় কৰা বঙালী মুক্তিয়াৰজন কোন আছিল?", [o("Madhu Mallik", "মধু মল্লিক"), o("Radhanath Barua", "ৰাধানাথ বৰুৱা"), o("Holiram Mishra", "হলিৰাম মিশ্ৰ"), o("J. D. Anderson", "জে. ডি. এণ্ডাৰচন")], 0),
      q("Who was hanged along with Maniram Dewan?", "মণিৰাম দেৱানৰ সৈতে কাক ফাঁচী দিয়া হৈছিল?", [o("Piyoli Barua", "পিয়লি বৰুৱা"), o("Bahadur Gaonburha", "বাহাদুৰ গাঁওবুঢ়া"), o("Dutiram Barua", "দুতীৰাম বৰুৱা"), o("Mayaram Nazir", "ময়াৰাম নাজিৰ")], 0),
      q("Maniram Dewan and Piyoli Barua were hanged on-", "মণিৰাম দেৱান আৰু পিয়লি বৰুৱাক কেতিয়া ফাঁচী দিয়া হৈছিল?", [o("26 February 1858", "২৬ ফেব্ৰুৱাৰী, ১৮৫৮"), o("24 February 1826", "২৪ ফেব্ৰুৱাৰী, ১৮২৬"), o("18 October 1861", "১৮ অক্টোবৰ, ১৮৬১"), o("28 January 1894", "২৮ জানুৱাৰী, ১৮৯৪")], 0),
      q("Who tried the case of Maniram Dewan?", "মণিৰাম দেৱানৰ গোচৰ কোনে বিচাৰ কৰিছিল?", [o("Captain Holroyd", "কেপ্তেইন হলৰয়েড"), o("General Dyer", "জেনেৰেল ডায়াৰ"), o("Lord Curzon", "লৰ্ড কাৰ্জন"), o("Lord Irwin", "লৰ্ড আৰউইন")], 0),
      q("Stamp Duties were introduced in Assam in-", "অসমত ষ্টাম্প ডিউটি কোন চনত প্ৰৱৰ্তন কৰা হৈছিল?", [o("1858", "১৮৫৮"), o("1860", "১৮৬০"), o("1861", "১৮৬১"), o("1894", "১৮৯৪")], 0),
      q("The peasant revolts in Assam were led by-", "অসমত কৃষক বিদ্ৰোহসমূহ কোনে নেতৃত্ব দিছিল?", [o("Raij Mels", "ৰাইজ মেল"), o("British officials", "বৃটিছ বিষয়া"), o("Tea planters", "চাহ বাগিচাৰ মালিক"), o("Missionaries", "মিছনেৰী")], 0),
      q("The first major peasant revolt in Assam during British rule was-", "বৃটিছ শাসনকালত অসমৰ প্ৰথম বৃহৎ কৃষক বিদ্ৰোহ কোনটো আছিল?", [o("Rangia Revolt", "ৰঙিয়া বিদ্ৰোহ"), o("Phulaguri Dhawa", "ফুলগুৰি ধেৱা"), o("Lachima Revolt", "লাচিমা বিদ্ৰোহ"), o("Patharughat Revolt", "পথৰুঘাট বিদ্ৰোহ")], 1),
      q("Phulaguri Dhawa took place in-", "ফুলগুৰি ধেৱা কোন চনত সংঘটিত হৈছিল?", [o("1857", "১৮৫৭"), o("1861", "১৮৬১"), o("1893", "১৮৯৩"), o("1894", "১৮৯৪")], 1),
      q("Which British officer was killed in Phulaguri Dhawa?", "ফুলগুৰি ধেৱাত কোন বৃটিছ বিষয়া নিহত হৈছিল?", [o("Lieutenant Singer", "লেফটেনেণ্ট চিংগাৰ"), o("Captain Holroyd", "কেপ্তেইন হলৰয়েড"), o("J. W. Quinton", "জে. ডব্লিউ. কুইন্টন"), o("J. R. Berington", "জে. আৰ. বেৰিংটন")], 0),
      q("Lachima was located in-", "লাচিমা ক'ত অৱস্থিত আছিল?", [o("Sarukhetri Mouza", "সৰুক্ষেত্ৰী মৌজাত"), o("Darrang district", "দৰং জিলাত"), o("Sibsagar district", "শিৱসাগৰ জিলাত"), o("Manipur", "মণিপুৰত")], 0),
      q("Who led the Jaintia revolt?", "জয়ন্তীয়া বিদ্ৰোহৰ নেতৃত্ব কোনে দিছিল?", [o("Ukiang Nongbah", "উকিয়াং নংবাহ"), o("Sambhudhan Kachari", "শম্ভুধন কছাৰী"), o("Tikendrajit", "টিকেন্দ্ৰজিত"), o("Maniram Dewan", "মণিৰাম দেৱান")], 0),
      q("The North Cachar revolt was led by-", "উত্তৰ কাছাৰৰ বিদ্ৰোহৰ নেতৃত্ব কোনে দিছিল?", [o("Sambhudhan Kachari", "শম্ভুধন কছাৰী"), o("Piyoli Barua", "পিয়লি বৰুৱা"), o("Kandarpeswar Singha", "কন্দর্পেশ্বৰ সিংহ"), o("Aklu Sheikh", "আকলু শেখ")], 0)
    ]
  },
  {
    title: {
      en: "Chapter 4 - Indian Freedom Movement and National Awakening in Assam",
      as: "অধ্যায় ৪ - ভাৰতৰ স্বাধীনতা আন্দোলন আৰু অসমত জাতীয় জাগৰণ"
    },
    questions: [
      q("The Treaty of Yandaboo was signed on-", "ইয়াণ্ডাবু সন্ধি কেতিয়া স্বাক্ষৰিত হৈছিল?", [o("24 February 1826", "২৪ ফেব্ৰুৱাৰী, ১৮২৬"), o("15 August 1857", "১৫ আগষ্ট, ১৮৫৭"), o("26 January 1948", "২৬ জানুৱাৰী, ১৯৪৮"), o("3 November 1947", "৩ নৱেম্বৰ, ১৯৪৭")], 0),
      q("The period from 1826 to 1858 in Assam is known as-", "অসমত ১৮২৬ৰ পৰা ১৮৫৮লৈ সময়ছোৱাক কি বুলি কোৱা হয়?", [o("Crown Raj", "ক্ৰাউন ৰাজ"), o("Company Raj", "কোম্পানী ৰাজ"), o("Swaraj", "স্বৰাজ"), o("Ahom Raj", "আহোম ৰাজ")], 1),
      q("Bengali language was introduced in Assam in-", "অসমত বাংলা ভাষা কোন চনত প্ৰৱৰ্তন কৰা হৈছিল?", [o("1826", "১৮২৬"), o("1836", "১৮৩৬"), o("1873", "১৮৭৩"), o("1888", "১৮৮৮")], 1),
      q("Assamese language was re-established in Assam in-", "অসমত অসমীয়া ভাষা পুনৰ প্ৰতিষ্ঠা কৰা হৈছিল-", [o("1857", "১৮৫৭"), o("1873", "১৮৭৩"), o("1888", "১৮৮৮"), o("1903", "১৯০৩")], 1),
      q("Assamese Literary Society was established in Calcutta in-", "কলকাতাত অসমীয়া লিটাৰেৰী ছ'চাইটি কোন চনত স্থাপন কৰা হৈছিল?", [o("1857", "১৮৫৭"), o("1872", "১৮৭২"), o("1888", "১৮৮৮"), o("1903", "১৯০৩")], 1),
      q("Asomiya Bhasa Unnati Sadhini Sabha was formed in-", "অসমীয়া ভাষা উন্নতি সাধিনী সভা কোন চনত গঠন কৰা হৈছিল?", [o("1872", "১৮৭২"), o("1888", "১৮৮৮"), o("1903", "১৯০৩"), o("1916", "১৯১৬")], 1),
      q("The most significant journal of Asomiya Bhasa Unnati Sadhini Sabha was-", "অসমীয়া ভাষা উন্নতি সাধিনী সভাৰ আটাইতকৈ গুৰুত্বপূর্ণ আলোচনীখন আছিল-", [o("Milan", "মিলন"), o("Jonaki", "জোনাকী"), o("Arunodoi", "অৰুণোদয়"), o("Bharati", "ভাৰতী")], 1),
      q("Who was the first editor of Jonaki?", "জোনাকীৰ প্ৰথম সম্পাদক কোন আছিল?", [o("Lakshminath Bezbarua", "লক্ষ্মীনাথ বেজবৰুৱা"), o("Chandrakumar Agarwala", "চন্দ্ৰকুমাৰ আগৰৱালা"), o("Hemchandra Barua", "হেমচন্দ্ৰ বৰুৱা"), o("Padmanath Gohain Barua", "পদ্মনাথ গোহাঞি বৰুৱা")], 1),
      q("The first session of Assam Chatra Sanmilan was held on-", "অসম ছাত্র সন্মিলনৰ প্ৰথম অধিৱেশন কেতিয়া অনুষ্ঠিত হৈছিল?", [o("25 December 1916", "২৫ ডিচেম্বৰ, ১৯১৬"), o("18 April 1921", "১৮ এপ্ৰিল, ১৯২১"), o("26 January 1948", "২৬ জানুৱাৰী, ১৯৪৮"), o("3 November 1947", "৩ নৱেম্বৰ, ১৯৪৭")], 0),
      q("The first session of Assam Chatra Sanmilan was presided over by-", "অসম ছাত্র সন্মিলনৰ প্ৰথম অধিৱেশনৰ সভাপতি কোন আছিল?", [o("Lakshminath Bezbarua", "লক্ষ্মীনাথ বেজবৰুৱা"), o("Nabin Chandra Bordoloi", "নবীনচন্দ্ৰ বৰদলৈ"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), o("Kuladhar Chaliha", "কুলধৰ চলিহা")], 0),
      q("The founder secretary of Assam Chatra Sanmilan was-", "অসম ছাত্র সন্মিলনৰ প্ৰতিষ্ঠাপক সম্পাদক কোন আছিল?", [o("Chandranath Sarma", "চন্দ্ৰনাথ শৰ্মা"), o("Tarun Ram Phookan", "তৰুণৰাম ফুকন"), o("Bishnuram Medhi", "বিষ্ণুৰাম মেধি"), o("Manik Chandra Baruah", "মাণিকচন্দ্ৰ বৰুৱা")], 0),
      q("The mouthpiece of Assam Chatra Sanmilan was-", "অসম ছাত্র সন্মিলনৰ মুখপত্ৰ আছিল-", [o("Jonaki", "জোনাকী"), o("Milan", "মিলন"), o("Arunodoi", "অৰুণোদয়"), o("Sanjibani", "সঞ্জীবনী")], 1),
      q("Ahom Sabha was formed in 1893 by-", "আহোম সভা ১৮৯৩ চনত কোনে গঠন কৰিছিল?", [o("Padmanath Gohain Baruah", "পদ্মনাথ গোহাঞি বৰুৱা"), o("Manik Chandra Baruah", "মাণিকচন্দ্ৰ বৰুৱা"), o("Jagannath Barua", "জগন্নাথ বৰুৱা"), o("Raja Naranarayan Simha", "ৰজা নৰনাৰায়ণ সিংহ")], 0),
      q("Jorhat Sarbajanik Sabha was founded in-", "যোৰহাট সাৰ্বজনিক সভা কোন চনত স্থাপন কৰা হৈছিল?", [o("1884", "১৮৮৪"), o("1893", "১৮৯৩"), o("1903", "১৯০৩"), o("1921", "১৯২১")], 0),
      q("Who founded the Jorhat Sarbajanik Sabha?", "যোৰহাট সাৰ্বজনিক সভা কোনে স্থাপন কৰিছিল?", [o("Jagannath Barua", "জগন্নাথ বৰুৱা"), o("Manik Chandra Baruah", "মাণিকচন্দ্ৰ বৰুৱা"), o("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), o("Chobilal Upadhyay", "ছবিলাল উপাধ্যায়")], 0),
      q("Assam Association was formed in 1903 by-", "অসম এছ'চিয়েছন ১৯০৩ চনত কোনে গঠন কৰিছিল?", [o("Manik Chandra Baruah", "মাণিকচন্দ্ৰ বৰুৱা"), o("Kuladhar Chaliha", "কুলধৰ চলিহা"), o("Tarun Ram Phookan", "তৰুণৰাম ফুকন"), o("Chandranath Sarma", "চন্দ্ৰনাথ শৰ্মা")], 0),
      q("Assam Association merged with Assam Provincial Congress Committee in-", "অসম এছ'চিয়েছন অসম প্ৰাদেশিক কংগ্ৰেছ কমিটিৰ সৈতে কেতিয়া একত্ৰিত হৈছিল?", [o("1905", "১৯০৫"), o("1916", "১৯১৬"), o("1921", "১৯২১"), o("1930", "১৯৩০")], 2),
      q("The first officially elected President of Assam Provincial Congress Committee was-", "অসম প্ৰাদেশিক কংগ্ৰেছ কমিটিৰ প্ৰথম আনুষ্ঠানিকভাৱে নিৰ্বাচিত সভাপতি কোন আছিল?", [o("Bishnuram Medhi", "বিষ্ণুৰাম মেধি"), o("Kuladhar Chaliha", "কুলধৰ চলিহা"), o("Tarun Ram Phookan", "তৰুণৰাম ফুকন"), o("Nabin Chandra Bordoloi", "নবীনচন্দ্ৰ বৰদলৈ")], 0),
      q("The Cunningham Circular was issued in connection with-", "কানিংহাম চাৰ্কুলাৰ কিহৰ সৈতে জড়িত আছিল?", [o("students' participation in political activity", "ছাত্রসকলৰ ৰাজনৈতিক কাৰ্যকলাপত অংশগ্ৰহণ"), o("abolition of land revenue", "ভূমি ৰাজহ বিলোপ"), o("formation of Muslim League", "মুছলিম লীগ গঠন"), o("establishment of Gauhati University", "গুৱাহাটী বিশ্ববিদ্যালয় স্থাপন")], 0),
      q("Gauhati University was established on-", "গুৱাহাটী বিশ্ববিদ্যালয় কেতিয়া স্থাপন কৰা হৈছিল?", [o("26 January 1948", "২৬ জানুৱাৰী, ১৯৪৮"), o("15 August 1947", "১৫ আগষ্ট, ১৯৪৭"), o("3 November 1947", "৩ নৱেম্বৰ, ১৯৪৭"), o("7 November 1959", "৭ নৱেম্বৰ, ১৯৫৯")], 0)
    ]
  },
  {
    title: {
      en: "Chapter 5 - Cultural Heritage of India and North East Region",
      as: "অধ্যায় ৫ - ভাৰত আৰু উত্তৰ-পূব অঞ্চলৰ সাংস্কৃতিক ঐতিহ্য"
    },
    questions: [
      q("The oldest civilization discussed as a source of Indian cultural heritage is-", "ভাৰতীয় সাংস্কৃতিক ঐতিহ্যৰ উৎস হিচাপে আলোচিত আটাইতকৈ প্ৰাচীন সভ্যতা কোনটো?", [o("Vedic Civilization", "বৈদিক সভ্যতা"), o("Indus Valley Civilization", "সিন্ধু উপত্যকা সভ্যতা"), o("Gupta Civilization", "গুপ্ত সভ্যতা"), o("Mauryan Civilization", "মৌৰ্য সভ্যতা")], 1),
      q("The Indus Valley Civilization developed around-", "সিন্ধু উপত্যকা সভ্যতা প্ৰায় কোন সময়ত বিকশিত হৈছিল?", [o("4000 BC", "খ্ৰীষ্টপূৰ্ব ৪০০০"), o("2000 BC", "খ্ৰীষ্টপূৰ্ব ২০০০"), o("1000 BC", "খ্ৰীষ্টপূৰ্ব ১০০০"), o("500 BC", "খ্ৰীষ্টপূৰ্ব ৫০০")], 0),
      q("Major towns of the Indus Valley Civilization included-", "সিন্ধু উপত্যকা সভ্যতাৰ মুখ্য নগৰসমূহৰ ভিতৰত আছিল-", [o("Harappa and Mahenjodaro", "হৰপ্পা আৰু মহেঞ্জোদাৰো"), o("Taxila and Nalanda", "তক্ষশিলা আৰু নালন্দা"), o("Pataliputra and Ujjain", "পাটলিপুত্ৰ আৰু উজ্জয়িনী"), o("Delhi and Agra", "দিল্লী আৰু আগ্ৰা")], 0),
      q("The Indus Valley Civilization extended up to-", "সিন্ধু উপত্যকা সভ্যতা ক'লৈকে বিস্তৃত আছিল?", [o("Meerut in Ganga Valley", "গংগা উপত্যকাৰ মীৰাটলৈ"), o("Kanyakumari", "কন্যাকুমাৰীলৈ"), o("Brahmaputra Valley", "ব্ৰহ্মপুত্ৰ উপত্যকালৈ"), o("Kabul Valley", "কাবুল উপত্যকালৈ")], 0),
      q("Which of the following was recovered from Indus Valley sites?", "সিন্ধু উপত্যকাৰ স্থানসমূহৰ পৰা তলৰ কোনটো উদ্ধাৰ হৈছিল?", [o("Statue of Pashupati", "পশুপতিৰ মূৰ্তি"), o("Taj Mahal", "তাজমহল"), o("Rong Ghar", "ৰংঘৰ"), o("Sanchi Stupa", "সাঁচী স্তূপ")], 0),
      q("The early Vedic period is considered to be between-", "প্ৰাৰম্ভিক বৈদিক যুগ কেতিয়াৰ পৰা কেতিয়ালৈ ধৰা হয়?", [o("1500 BC to 1000 BC", "খ্ৰীষ্টপূৰ্ব ১৫০০ৰ পৰা খ্ৰীষ্টপূৰ্ব ১০০০লৈ"), o("1000 BC to 600 BC", "খ্ৰীষ্টপূৰ্ব ১০০০ৰ পৰা খ্ৰীষ্টপূৰ্ব ৬০০লৈ"), o("400 BC to 200 BC", "খ্ৰীষ্টপূৰ্ব ৪০০ৰ পৰা খ্ৰীষ্টপূৰ্ব ২০০লৈ"), o("200 BC to 200 AD", "খ্ৰীষ্টপূৰ্ব ২০০ৰ পৰা খ্ৰীষ্টাব্দ ২০০লৈ")], 0),
      q("The term Satyameva Jayate was taken from-", "সত্যমেৱ জয়তে বাক্যটো ক'ৰ পৰা লোৱা হৈছে?", [o("Rig Veda", "ঋগ্বেদ"), o("Mundaka Upanishad", "মুণ্ডক উপনিষদ"), o("Ramayana", "ৰামায়ণ"), o("Arthashastra", "অৰ্থশাস্ত্ৰ")], 1),
      q("The phrase unity in diversity was established through Nehru's book-", "বৈচিত্ৰ্যৰ মাজত ঐক্য ধাৰণাটো নেহৰুৰ কোন গ্ৰন্থৰ জৰিয়তে প্ৰতিষ্ঠিত হৈছিল?", [o("Arthashastra", "অৰ্থশাস্ত্ৰ"), o("Discovery of India", "ডিস্কভাৰী অৱ ইণ্ডিয়া"), o("Rajtarangini", "ৰাজতৰঙ্গিণী"), o("Natyashastra", "নাট্যশাস্ত্ৰ")], 1),
      q("Kautilya's famous book on political science is-", "কৌটিল্যৰ ৰাজনীতি বিষয়ক বিখ্যাত গ্ৰন্থখনৰ নাম কি?", [o("Arthashastra", "অৰ্থশাস্ত্ৰ"), o("Natyashastra", "নাট্যশাস্ত্ৰ"), o("Rajtarangini", "ৰাজতৰঙ্গিণী"), o("Naamghosa", "নামঘোষা")], 0),
      q("Rajtarangini was written by-", "ৰাজতৰঙ্গিণী কোনে ৰচনা কৰিছিল?", [o("Kalhan", "কলহণ"), o("Bharat Muni", "ভৰত মুনি"), o("Kautilya", "কৌটিল্য"), o("Sankardeva", "শংকৰদেৱ")], 0),
      q("The Natyashastra was written by-", "নাট্যশাস্ত্ৰ কোনে ৰচনা কৰিছিল?", [o("Kalhan", "কলহণ"), o("Bharat Muni", "ভৰত মুনি"), o("Kautilya", "কৌটিল্য"), o("Madhab Kandali", "মাধৱ কন্দলি")], 1),
      q("The Natyashastra contains around-", "নাট্যশাস্ত্ৰত প্ৰায় কিমান শ্লোক আছে?", [o("1000", "১০০০"), o("3000", "৩০০০"), o("6000", "৬০০০"), o("10000", "১০,০০০")], 2),
      q("Greek-Roman techniques were used in which Indian sculpture style?", "কোন ভাৰতীয় ভাস্কৰ্য শৈলীত গ্ৰীক-ৰোমান কৌশল ব্যৱহাৰ কৰা হৈছিল?", [o("Gandhara", "গান্ধাৰ"), o("Mathura", "মথুৰা"), o("Amaravati", "অমৰাৱতী"), o("Gupta", "গুপ্ত")], 0),
      q("The slokas of which Veda were sung by priests called Udgata?", "কোন বেদৰ শ্লোকসমূহ উদ্গাতা নামৰ পুৰোহিতসকলে গাইছিল?", [o("Rig Veda", "ঋগ্বেদ"), o("Sama Veda", "সামবেদ"), o("Yajur Veda", "যজুৰ্বেদ"), o("Atharva Veda", "অথৰ্ববেদ")], 1),
      q("Which dance form of Assam is recognized as an Indian classical dance?", "অসমৰ কোন নৃত্যশৈলী ভাৰতীয় শাস্ত্ৰীয় নৃত্য হিচাপে স্বীকৃত?", [o("Bihu", "বিহু"), o("Satriya", "সত্ৰীয়া"), o("Bagurumba", "বাগৰুম্বা"), o("Jhumur", "ঝুমুৰ")], 1),
      q("The Heraka movement was launched by-", "হেৰাকা আন্দোলন কোনে আৰম্ভ কৰিছিল?", [o("Rani Gaidinliu", "ৰাণী গাইদিনলিউ"), o("Kanaklata Barua", "কনকলতা বৰুৱা"), o("Sarala Devi", "সৰলা দেৱী"), o("Sister Nivedita", "ছিষ্টাৰ নিবেদিতা")], 0),
      q("Hornbill Festival is celebrated in-", "হৰ্ণবিল উৎসৱ কোন ৰাজ্যত পালন কৰা হয়?", [o("Nagaland", "নাগালেণ্ড"), o("Mizoram", "মিজোৰাম"), o("Assam", "অসম"), o("Tripura", "ত্ৰিপুৰা")], 0),
      q("The word Mizo means-", "মিজো শব্দৰ অৰ্থ কি?", [o("people of the plains", "সমতলৰ লোক"), o("inhabitants of the hills", "পাহাৰৰ বাসিন্দা"), o("people of the river", "নদীৰ লোক"), o("warriors", "যোদ্ধা")], 1),
      q("The ancient names of Assam were-", "অসমৰ প্ৰাচীন নাম আছিল-", [o("Pragjyotishpur and Kamrup", "প্ৰাগজ্যোতিষপুৰ আৰু কামৰূপ"), o("Magadh and Kosala", "মগধ আৰু কোশল"), o("Anga and Vanga", "অঙ্গ আৰু বঙ্গ"), o("Kalinga and Avanti", "কলিঙ্গ আৰু অৱন্তী")], 0),
      q("Madhab Kandali translated the Saptakanda Ramayana under the patronage of-", "মাধৱ কন্দলীয়ে কাৰ পৃষ্ঠপোষকতাত সপ্তকাণ্ড ৰামায়ণ অসমীয়ালৈ অনুবাদ কৰিছিল?", [o("Barahi King Mahamanikya", "বৰাহী ৰজা মহামাণিক্য"), o("Ahom King Gadadhar Singha", "আহোম ৰজা গদাধৰ সিংহ"), o("Chilarai", "চিলাৰায়"), o("Naranarayan", "নৰনাৰায়ণ")], 0)
    ]
  }
];

window.XOHOPATHI_TESTS = {};
historyChapters.forEach(chapter => {
  [1, 2].forEach(testNumber => {
    const start = (testNumber - 1) * 10;
    window.XOHOPATHI_TESTS[makeSetId(chapter.title.en, testNumber)] = {
      id: makeSetId(chapter.title.en, testNumber),
      className: { en: "Class 10", as: "শ্ৰেণী ১০" },
      subject: { en: "Social Science", as: "সমাজ বিজ্ঞান" },
      section: { en: "History", as: "ইতিহাস" },
      chapter: chapter.title,
      test: { en: "Test " + testNumber, as: "টেষ্ট " + testNumber },
      durationMinutes: 10,
      correctMarks: 1,
      wrongMarks: -0.25,
      questions: chapter.questions.slice(start, start + 10)
    };
  });
});
