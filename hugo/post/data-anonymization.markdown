---
date: 2014-09-13
tags:
- ddd
- analytics
- Domain Event
title: Data Anonymization
---



Various organizations, such as hospitals, social agencies or
commercial companies, sometimes need to release potentially sensitive
information to the other parties. They might want to do that in order
to gain additional insight into the domain or run a specific research
for which they don't have resources.

While releasing such information, privacy of people and businesses
should be protected. We don't want risk the chance of somebody
stealing that data and abusing information in it.

This is achieved via data anonymization process - removal of all
personally identifiable information while preserving patterns
essential for research. Anonymized data can then be shared with the
people outside of organization without endangering confidentiality or
leaking business secrets.


{{% img src="data-anonymization.jpeg" %}}

For example, consider a business domain that captures all relevant
events. These events, after anonymization process, might look like the
one below:

```
{
  date: "2014-09-04T23:02:00",
  group: [ { ref: 1, delta: 1 }, { ref: 2, delta: 11 }]
}
```

As you can see, there isn't much personal information there.  This
event tells only that on September 9th something happened, involving
two groups of records, with some deltas. It is just a data point now.

*Can you guess, which event or type of business we are talking about?*

This is how good anonymized data might look like. It contains enough
information to run the necessary
[behavioral analysis](/post/behavioral-analytics/), however all personally
identifiable information was erased from it. This prevents
cross-referencing of that information and tracing it back to the
origins.

This anonymized event was produced from the original event by:

* erasing all human-readable information;
* reducing precision of times or numeric values;
* replacing identifiers and tags with sequential numbers (1,2,3);
* altering field names to decouple event from the domain;
* distorting some values by introducing random noise (perturbation).

For the reference, original event could have looked like this before
destructive data anonymization:

```
{
  tenant : "contsco-ebay",
  id : "contsco-2024-09-10-0334",
  time : "2014-09-04T22:57:55",
  status : "pending",
  shipping : {
    country : "Russia",
    zip : "450075",
    line1 : "Ufa ul.Zorge 66-61",
    to : "Abdullin Rinat",
    carrier : "usps"
  },
  products: [
    {
      id : "ksm6573er",
      name : "Kitchen Aid 6573 Empire Red",
      quantity : 1,
      price : "200 EUR"
    },
    {
      id : "ka1234",
      name : "Plastic shield guard",
      quantity : 10,
      price : "7.99 EUR"
    }
  ]
}
```

In some cases, original domain could capture events on a really
fine-grained level, allowing to apply _data generalization_ - merging
multiple events together into a more generic one. For example, we could
sum all product sales in a day, producing a table of daily sales. This
significantly reduces information quality but still keeps statistical
analysis possible.

## Leaking sensitive information

Diligence is required in data anonymization process. It is **possible to
leave some personally identifiable information in the data**, even
though it might not look like that at first sight.

For example, hospital records without patient names but with birthdays
and cities can be cross-referenced with other data sources,
potentially leaking identities.

In this case, it is better to weigh the risk of disclosure and
invest extra effort into data anonymization. For example, birthdays
could be randomly shifted by 30 days or rounded down to years. City
names could probably be discarded, unless geographical location is
required by the research.

## Losing valuable information

It is possible to **apply too much anonymization and discard valuable
research information in the process**. For example, aggregating
individual sales into daily sums leads to loss of information on the
shopping habits of customers. Researchers will not be able to analyze
them, coming up with models for promotions and personalized discounts.

Instead of aggregation, it could be possible to hide individual
customers behind artificial numeric identifiers (1,2,3...). If extra
caution is needed, it would be possible to reduce the risk of
cross-referencing by applying various data transformations. For
example:

* replace each sale of "Google Nexus 5" with 1 "Luxury phone" and 3
"post cards";
* whenever a person buys 1kg of candies, multiply the amount by 2.

Applying these transformations allows to keep important patterns in
the anonymized data without making it useless for research.

These are oversimplified examples, of course, but they can serve as an
example of the general approach. We **remove some confidential data
and 'encode' the rest in research-friendly way, while keeping the key
secret**.


## Summary

Data anonymization allows organizations to share private information
with external researchers. This process has to be done carefully,
balance kept between the two extremes: leaking personally identifiable
information and removing bits valuable for the research.

There are no general rules of thumb here.
