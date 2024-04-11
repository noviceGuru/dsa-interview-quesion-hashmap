const dataExample = {
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

const getDuplicates = () => {
    const spamScoresMap = new Map()
    const domainAuthoritiesMap = new Map()

    const dupSpamScores = new Set()
    const dupAuthorities = new Set()

    dataExample.idina_response.sources.forEach(el => {
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

console.log(getDuplicates(dataExample))