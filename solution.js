/* THIS IS A SOLUTION TO THE FOLLOWING QUESTION:


You will be given a large set of data with the following JSON format in `data.json`
```
{
  "idina_response":{
    "sources":[
      {
        "url":"example.com",
        "spam_score": 1,
        "matching_target_indexes":[
          0
        ],
        "matching_source_urls":[
          {
            "url":"example.com/news/current/",
            "page_authority":44
          }
        ],
        "domain_authority":95
      },
      // ...
    ]
  }
}
```
From this data we would like you to write code that produces two lists. The first will
be the list of all the URLs that have a duplicate `spam_score`,
and the second will be a list of all the URLs with a duplicate `domain_authority`. */


/* THE ANSWER:

I used two hash maps to track spam_score and domain_authorities respectively. I also created two
Sets to save the duplicate spam scores and domain authorities, since it will be a unique array.

Then, I iterated over the data json, first checking if the map already contains the spam_score (or in
the other case domain_authorities). If it already contained it, I add the url to the set, and also the url that
is already present in the hash map.

Using has maps and sets (which both use built in hash functions), searching time would decrease to O(1),
and the operation would be easily scalable.

In the end, I printed the outcome of the two examples provided in the question, and also tried to add two corner
cases as examples. Running the file, you'll see the outcomes printed.

My apologies for not separating the documentation file and the data file, since I tried to follow
what the question suggested, to put all in a text file, so it would be also readable easily.

*/

const exampleOne = {
    "idina_response": {
        "sources": [
            {
                "url": "example.com",
                "spam_score": 1,
                "domain_authority": 95
            },
            {
                "url": "foo.com",
                "spam_score": 2,
                "domain_authority": 100
            },
            {
                "url": "bar.com",
                "spam_score": 1,
                "domain_authority": 100
            },
            {
                "url": "baz.com",
                "spam_score": 1,
                "domain_authority": 12
            },
            {
                "url": "qux.com",
                "spam_score": 2,
                "domain_authority": 401
            },
            {
                "url": "moz.com",
                "spam_score": 186,
                "domain_authority": 99
            },
        ]
    }
}

const exampleTwo = {
    "idina_response":{
      "sources":[
        {
          "url":"example.com",
          "spam_score": 1,
          "matching_target_indexes":[
            0
          ],
          "matching_source_urls":[
            {
              "url":"example.com/news/current/",
              "page_authority":44
            }
          ],
          "domain_authority":95
        },
        // ...
      ]
    }
  }
  
  const exampleThree = {
      "idina_response":{
          "sources":[
              {
          "url":"example.com",
          "spam_score": 1,
          "matching_target_indexes":[
              0
            ],
            "matching_source_urls":[
                {
              "url":"example.com/news/current/",
              "page_authority":44
            }
        ],
        "domain_authority":95
    },
    {
        "url":"example.com",
        "spam_score": 1,
        "matching_target_indexes":[
            0
          ],
          "matching_source_urls":[
              {
              "url":"example.com/news/current/",
              "page_authority":44
            }
        ],
        "domain_authority":95
    },
    {
        "url":"example.com",
        "spam_score": 1,
        "matching_target_indexes":[
            0
        ],
        "matching_source_urls":[
            {
                "url":"example.com/news/current/",
                "page_authority":44
            }
        ],
        "domain_authority":95
    },
    {
        "url":"example.com",
        "spam_score": 1,
        "matching_target_indexes":[
            0
        ],
        "matching_source_urls":[
            {
                "url":"example.com/news/current/",
                "page_authority":44
            }
        ],
        "domain_authority":95
    },
    
]
}
}

const exampleFour = {
    "idina_response":{
      "sources":[]
    }
  }


  const getDuplicates = (data) => {
    const spamScoresMap = new Map()
    const domainAuthoritiesMap = new Map()

    const dupSpamScores = new Set()
    const dupAuthorities = new Set()

    data.idina_response.sources.forEach(el => {
        if (spamScoresMap.has(el.spam_score)) {
            dupSpamScores.add(el.url)
            dupSpamScores.add(spamScoresMap.get(el.spam_score))
        } else {
            spamScoresMap.set(el.spam_score, el.url)
        }

        if (domainAuthoritiesMap.has(el.domain_authority)) {
            dupAuthorities.add(el.url)
            dupAuthorities.add(domainAuthoritiesMap.get(el.domain_authority))
        } else {
            domainAuthoritiesMap.set(el.domain_authority, el.url)
        }
    })

    const duplicates = {
        "duplicate_spam_scores": Array.from(dupSpamScores),
        "duplicate_domain_authorities": Array.from(dupAuthorities)

    }

    return duplicates
}


// Test cases
console.log('Example One: ',getDuplicates(exampleOne))
console.log('Example Two: ',getDuplicates(exampleTwo))
console.log('Example Three: ',getDuplicates(exampleThree))
console.log('Example Four: ',getDuplicates(exampleFour))