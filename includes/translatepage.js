// ==UserScript==
// @include http://*
// @include https://*
// ==/UserScript==

/*global window, document, opera */

( function() {
    
if ( window.location !== window.parent.location ) {
    return;
}
    
var imgLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd%2BUAAAWBGlDQ1BJQ0MgUHJvZmlsZQAAeAHVWHdUVD%2Bbzp0KQ29D770X6b1XkV5FYBx6700EKaIC0qSjIEW6oqggShMRUAEBu4A0aQqIItJhL%2F72fN%2FuObv%2F7T%2Bbc3Lz3CSTucmbvHmeFwDGj4SgID8ENQD%2BAWEhlgbaXPYOjlzYz4AUsMFZCUgTiKFBWubmJ8H%2Fmv68B9Bx4xvx47H%2B127%2FcwONm3soEQDIHG4%2B6xZK9IfxAxhLEINCwmD8FcYjkWFBMEYc19OHwB8I44Fj7PkPnjjGZ%2F%2FB63%2F7WFvqAIBEAUBCTiCEeAJABs8QcEUQPeFxyKQAwNAGuHkHAECjC2N1ohfBDQDGZLiPmL9%2F4DG%2BC2Ohs%2F9lHM%2F%2FggmEs%2F8ak0Dw%2FBf%2BZy7wL%2BE%2F1vUODfIjRP99%2Bb98%2BPuFw%2Bv1Nx2vOrl7gI0VXNLCmQ3ogEDgB%2BcQwAVOwm%2Fw7MLco%2BA5A6ATGBQd4u3pFcalBVvJXYzLKIAoIcYlIyUNL8f%2Fo3S8P%2F%2F53A3Lv%2FsOwr%2F%2Bdx1hFwClPgDQH%2F5d5x8MQOMhvDx0%2F64T9AWAWRWAezrE8JCIf8ZDHRdogANUgB4wAw7AC4SAOJAB8kAFaAI9YAzMgDVwAM6ACLyAP7zKkSAWJIAUkAayQB4oBmWgEtSC26AZtIJ28BT0gVdgBLwD42AazIPvYB38AXsQBGEhCogOYoY4IX5IFJKBFCF1SA86CVlCDpAr5AkFQOFQLJQEpUE5UDFUDtVB96A26Cn0AhqFPkEz0DL0C9pFIBHkCHoEO0IAIYlQRGghTBDWiDMIT0QwIgaRjMhAFCIqEI2IFsRTxCvEO8Q04jtiEwmQZEg8khspjlRE6iDNkI5ID2QIMg6ZisxHViDvIB8j%2B5FvkNPIFeQOCoOiQ3GhxFEqKEOUDYqICkbFodJRxahaVAuqF%2FUGNYNaRx2iKdBsaFG0MtoIbY%2F2REeiU9D56Gr0Q%2FRz9Dv0PPoPBoPBYwQxChhDjAPGB3MOk465gWnCdGNGMXOYTSwWy4wVxaphzbAEbBg2BVuEbcR2Ycew89htEjISThIZEn0SR5IAkkSSfJJ6kk6SMZJFkj1SalJ%2BUmVSM1I30mjSTNIq0sekr0nnSfdwNDhBnBrOGueDS8AV4u7gnuMmcBtkZGQ8ZEpkFmTeZBfICsnukg2QzZDtkNOSi5DrkDuRh5NnkNeQd5N%2FIt%2BgoKAQoNCkcKQIo8igqKN4RvGFYpuSjlKC0ojSjTKesoSyhXKMco2KlIqfSovKmSqGKp%2FqPtVrqhVqUmoBah1qAnUcdQl1G%2FUH6k0aOhppGjMaf5p0mnqaFzRLtFhaAVo9WjfaZNpK2me0c3RIOl46HToiXRJdFd1zunl6DL0gvRG9D30a%2FW36Yfp1BloGWQZbhiiGEoYOhmk8Ei%2BAN8L74TPxzfj3%2BF1GdkYtRnfGK4x3GMcYt5hYmTSZ3JlSmZqY3jHtMnMx6zH7MmcztzJPsqBYRFgsWCJZSlmes6yw0rOqsBJZU1mbWT%2BzIdhE2CzZzrFVsg2ybbJzsBuwB7EXsT9jX%2BHAc2hy%2BHDkcnRyLHPScapzenPmcnZxfuNi4NLi8uMq5OrlWudm4zbkDucu5x7m3uMR5LHhSeRp4pnkxfEq8nrw5vL28K7zcfKZ8sXyNfB95iflV%2BT34i%2Fg7%2BffEhAUsBO4JNAqsCTIJGgkGCPYIDghRCGkIRQsVCH0VhgjrCjsK3xDeEQEISIn4iVSIvJaFCEqL%2BotekN0VAwtpiQWIFYh9kGcXFxLPEK8QXxGAi9xUiJRolViTZJP0lEyW7Jf8lBKTspPqkpqXJpW2lg6Ufqx9C8ZERmiTInM2xMUJ%2FRPxJ94dOKnrKisu2yp7Ec5OjlTuUtyPXIH8gryIfJ35JcV%2BBRcFa4rfFCkVzRXTFccUEIraSvFK7Ur7SjLK4cpNyv%2FUBFX8VWpV1lSFVR1V61SnVPjUSOolatNq3Opu6rfVJ%2FW4NYgaFRozGryarppVmsuaglr%2BWg1aq1pS2mHaD%2FU3tJR1jmv062L1DXQTdUd1qPVs9Er1vuiz6Pvqd%2Bgv24gZ3DOoNsQbWhimG34wYjdiGhUZ7RurGB83rjXhNzEyqTYZPakyMmQk49NEabGptdMJ07xnwo41WoGzIzMrplNmguaB5s%2FscBYmFuUWCxYSlvGWvZb0Vm5WNVb%2FbHWts60HrcRsgm36bGlsnWyrbPdstO1y7Gbtpe0P2%2F%2FyoHFwdvhkSPW0dax2nHztN7pvNPzTnJOKU7vzwieiTrzwpnF2c%2B5w4XKheBy3xXtauda77pPMCNUEDbPGp29fnadqEMsIH5303TLdVt2V3PPcV%2F0UPPI8VjyVPO85rnspeGV77XireNd7P3Tx9CnzGfL18y3xvfIz86vyZ%2FE39W%2FLYA2wDegN5AjMCpwNEg0KCVoOlg5OC94PcQkpDoUCj0T%2BiiMHiYCg%2BFC4RfDZyLUI0oitiNtI%2B9H0UQFRA1Gi0RfiV6M0Y%2B5dQ51jniuJ5Y7NiF25rzW%2BfI4KO5sXE88b3xy%2FPwFgwu1CbgE34ShRKnEnMTfSXZJj5PZky8kz100uNiQQpkSkvLhksqlssuoy96Xh6%2BcuFJ05TDVLfVlmlRaftp%2BOjH95VXpq4VXjzI8MoYz5TNLszBZAVnvszWya3NocmJy5q6ZXmvJ5cpNzf2d55L3Il82v6wAVxBeMF14svBREV9RVtF%2BsVfxuxLtkqbrbNevXN%2B64XZjrFSz9E4Ze1la2e5N75sfyw3KWyoEKvIrMZURlQtVtlX9txRv1VWzVKdVH9QE1EzXWtb21inU1dWz1Wc2IBrCG5YbnRpHbuvefnRH%2FE55E74p7S64G3732z3Xe%2B%2BbTZp77ivev%2FOA%2F8H1h3QPU1ugluiW9Vav1ulHDo9G24zbeh6rPH74ROJJTTt3e0kHQ0dmJ64zufOoK6Zrszuoe%2BWp59O5Hpee8Wf2z972WvQOPzd5PtCn3%2FesX6u%2Fa0BtoP2F8ou2l4ovW1%2FJv2oZlBt8OCQ39HBYfrjltcLrRyNKI49HVUc7xzTGnr7RfdP31ujtq3en3o2%2Bt3n%2F8YPTh%2BmPbh%2BXPvl9%2Bvk54vPe%2BIUJ9ETqJPVk%2Fhe2LxVTwlNN0%2FLTHTO6M4OzVrPjc8S5719Dv%2B7PJy9QLOQvci7WLckstS%2FrL498O%2F1t%2FnvQ972VlFWa1etrQmsPfmj%2BGFy3X5%2F%2FGfLz6Ff6BvNGzW%2FZ3z2b5ptf%2Fvj%2F2dtK3Wbert1R3Onftdtd3Ivcx%2B4XHggfPD40OZw48j86CiKEEP5yAST8RHh4APCrBgAKBwDoRgDAdf%2FDH%2F%2F2gOklTL8QMEbCfIEfZgfBoA6sQQrQFWgBcRoxh7yM0kOzY%2BSw3iSvcJ7k8pRiVIc0Y3Q5DNr4OaYg5jlWE7YK9jVOIS5X7ms8T3nX%2BTkFTAUjhEqFB0R%2BijGKa0j4SRZI9UsfnVCRPSfXJr%2BhyK9kqRyrclO1R21KfV%2BTUUte20YnQrdE74n%2BmMGs4brRtvHBSXDyyPTo1JE5ZIG2pLRisZa2Mbb1srtsX%2Bsw4DhzesNp%2F8y%2B84bLjOsXwi6Rw83QPdzjlucHb3IfLd9Qvwr%2FoYDxwK6gvOCwEOdQy7BT4VYRZyJ9oqKjk2OyzpXGNp5%2FGPckvv3Co4TmxMak6uTyi%2BUpZfBJKbmSm5qadiE94qp%2Fhnemd5ZfdmhOxLWQXP88Yr5tgUGhfJFgMWsJ7XXyG6gbm6VTZf03G8rTK3wqjapEblHd%2BlM9W%2FOldrrua%2F23hh%2BN67dX7kw0Pb9bcS%2BnueD%2BrQctD4daZlu32nCPmZ%2Fwt3N3oDpGO291JXf7PXXpcXzm2Ov03LnPpZ844PbC5aXtK8NBuSHOYZLh9dcfR7pGb45deOP0VvEd3bu198Mf7n4s%2FHThs9u4zgTnxNbk6JfaqeRp4ozBrMQc7dyvr4PzFQuhizpLdEtzy63fMr8HrZitsq%2B%2BXfP%2FAX6krLOsT%2F3c%2BLW5kfdb6nffpvcf5j%2FftzZ2XPd6jo7%2B2p8cZt5ywA4kghbwG9KECmBudg5JjmxFnUM7YhywSfAOMCAbp0ijMqdhp12mL8cbMo4xG7PUsq6yc3KIcCpwqXMb8ZzhDeXL5G8UeCH4XZheRFXUSyxLvFPiuxSTtI6M34l82W65rwo4RQklY2VPlTjVLLUK9Xsa3ZpDWu%2B1p3XmdBf1lvQX4H0wbjRq3G%2FScbLZtPpUsVm6ebxFuGW0VZJ1uk2u7XW7Cvtqh1rH%2BtP1TvVnGp1vuzS5PiC0ne0hDrl9dl%2F22PdCem17z%2FuM%2Bnb4NfiXBFwNjAsKDvaCd4N9mFW4RYR5pGWUXbRLjMc5v1if87Zx6vFCF%2BgTMAk7iWtJi8kzFydS3l0avvziSm%2Fq47Tm9OqrhRlXMiOyQrN9c9yvncm1yjPIVyoQLsQXIYpWYB%2FYfr38RkqpT9nJm5LljBW4SrIqilvU1bQ19LX0dXT1tA20jTS3qe9QNlHcJbuHaya5T%2FIA9WD74XzLaGvPo%2Ftt1Y%2BvPyloz%2BvI6yzsKuuufdrU0%2FGsv%2Ffd8%2Fm%2Blf6FgYkXb17C7mbw09CX4YXXqyMbo5tjG29W33599%2BZ914eKj6mf8j7fGe%2Bf%2BDz57cvvqe3pvZmt2dW5qa%2FD820LFYtpS8HLdt%2F0v%2BuuaKxKrDGvHfyYXX%2F6s%2BpX6kbob%2FdN9z9RW1Xbm7vX9hf%2B2h8BsIAG1luywBTWXjmgA%2FYCwpA%2F1Aqz82QkGtmECkPbYzyxtSR7OFOyTPJBSgQVH7U6jT6tAZ0m%2FQkGFoYD%2FAxjJ1MusweLPCuOdZqtjT2PI4TTnEuSm4L7G89z3nK%2BKH4jAWaBr4JNQtHC2iKkImOiN8T8xNUkqCXmJVulkqVNZKhkXp9IlzWUPZJrlQ9UEFKYUyxXIiqLK%2B%2BrjKjWqMWr22uIaxxqvtDK0D6lg9J5pVuhl6jvbmBiKGPEaow2XjV5c7LFNO%2BUlxmZ2V1zOwtSi27LeCt9a2rrLzYNtlF2%2BvbM9isOHY7pp%2B2cuJyWztxzjnUxcMW7LhBaziYTzdyY3KbcazwCPJW9SLw%2BeTf4nPPV9aPwe%2BNfFOAcyB%2F4I6gjOCOEGCoXBoUNhF%2BNMI3ERfZFJUSrRx%2FEdJ%2B7FHv2vE6cYDxV%2FOaFzwlPEq8lEZNFLiIv%2FkxZvDR7efrKdOp02lT6%2BNW3GV2Z6VkKWUvZ5Tlu16RzUbkTea35OQVBhTZFysXsxQcl49dbbuSUBpeZ3zxRzlR%2BVLFQOVjVfKuoOrkmvNanzqPes8Gn0fe27x3%2FpuC7MffSmqvu9z1Ya6FvlXtk0ebxOPJJSntBR11nV9fn7qMeiWeE3sLnI%2F3IAekXdi9DX10c%2FDH8eOTR2M670o8vJj7Nai0%2F2ZQ8tv8%2FcYTjOwEjD0DBMgCnzQGwLgEgwxYAwWI4loADwJwCrlMCCCchgOA2AJAex7%2FuDxagCCyBN4gH2bB6fAB6wRswCyvFQ4gcYoXEIFXoFKwJw6DLUCn0ABqEbxcEghOhjnBBJCJqEa8R20geWMfFIhuQ4ygKlBYqAtWI%2BormQDugc9GjGCqMKSYN8xJLijXGpmNHSZhJiCRNJIewdqok3cFZ4BrI0GQEsk5yVvIY8kkKfYpmSi7Ka7DCSaQ6oj5PfUATRwtoE2C1kkAP0V9gAAyJeDQ%2BnZGJsY5Jm2mWOZVFjeUdqzfrPlsGOzf7fQ5DjnHOIC4sVzm3GvckzwXeU3yK%2FCz8vwX6BfOEnIUFhNdEWkUvitmI84n%2FkRiSrJNKkw6TOXvCSlZfTkVeQoFPkVWJSZlFhUdVXE1F3UjDWtNZy1M7QOe8bp7ePf33hsBI2tjdpPDkS9NdM2Fzd4smK2DtaNNuJ2Cf5bB72tWpz5nBxdn1FmGFKO92yX3K08RrwMfJ962%2FWEBc4EgwW0hAaHc4PiIs8n20Xsx4bFtc2gW9hLWklIv4lIrLUle606zT5zOSskSzp66V5fkVqBcxFK9ff1369GZrxZOqZ9Wva8fq3zS%2BvNN7923z6kPGVp22iCc3O552fXq63SvY5zXQ%2Fop3KP317pjL28fv%2F3xymVCe6p5rWfBZMv92dvXFz5DfD7ecdkL3aPYJB%2BIH24epR5ijpL%2F%2BgwdogzMgAlyFrd8KXoJJ2H8AiAbigWThmIAd5A1HAjKhKlj%2Fj0DLsObnRKghnGHb1yE%2BIDGwivdFliLHUFiUKioMtvz8f1p%2BDEONMcNkYcaweKwTthL7nUSeJIlklJSbNJz0JY4HF4cbJ1MlKyVHkPuQv4U1bzMlL2UxFR1VFjU1dS4NC00FrQTtEzpTumn6cAYUQxaeE3%2BPUY9xnCmcmY65mcWGZZe1nM0IVo5lHKYcu5w1XDbcaO77PEReHt5ffH38pQKRgmZCwrCimxPpFi0TixN3llCT5JA8kpqS7pKpOHFZNlouTj5doUCxQqlO%2Bb5Ku%2BoztSH1zxrfNQ%2B0KXVEdPX0vPSzDNoNfxhTm6id9DQtPDVkjrMwssy2mrSRsk2x%2B%2Bpg6HjHieXMVecDV2%2FCQyLazRr2P%2Ftett4PfBn8Iv0nA3WD7oVwhmaHIyNiItejfWM2YjPjZOKHE%2FySSJMrU5QuDV5xTl1Nj8nAZhZlc%2Bc8yNXOGy7wKmIvnrxeVmpxE13eWulzi6V6qDalXq%2BR%2BvbXpp57zfdvP%2Bxq7WsLeSLQPt55o5vYo9DL%2FPyw%2F%2FeLnUGyYb6RU2Pn3t59v%2FpJbFx5Um8qYqb5K3rBaen5d77VuB9jv1C%2FGf%2FgtkZ3Anen9vEHmIPJwxswUTvmD0pwJCkXPvcj4Btsdzx84nUgJygSugbHfMagTQQbQh8RiqhEfERSI42RV5BDKAaUM6oOtYnWQV9Dz2OUMTmYVawJ9i58ti%2BR7JAGki7j3HGzZK5kU%2BSu5IsUUZSUlI1UFlQH1LdpCLQMtC%2FpoukF6EcZ4vDi%2BFnGUiZ3ZiUWNpZF1ho2T3ZB9iWOBs5ALiVuLPcEzyPeRX4GAVlBQyELYXsRZ1EfsSjxRIlsyRqpPunVE0yyenKh8qUKQ0pAWV0lSXVYnV3DS7NZa1fHULdaH2cQabhk7GjSbyp1Khfmo4lWVNb1tlb2CIfm085nkM6JLruEgLMzbqfdJzxDvTl95v18%2FacDLYI6Q8RCi8NxEUlRUHT6OY%2Fzt%2BK7EzqTqi6ev2RxRTB1N70rIy2LkKOVK5KPLwRF30pe37hblld%2BvtLvlkONdh1X%2FVZj7530u9bNfPe3Hg60FrQRnrC3j3RGd7M97XkW9Fygb2ngwcvUQbdh5RH60cU3Le%2BiP0h%2BnP6cOaEyuTxVNnN6ju%2FrzsLs0tQ3ne%2BxK%2BWrbWs9P7rWa3%2Bm%2FbLZYNoY%2Fh2xybnZ9EfpT%2B%2BW5lbTNud2xvbGjvFOxc7Orvlu1e7XPb49971bewv7Avse%2B9n7HftLB3QHGgc%2BB3kHTw9WDpkODQ%2FjD1sOV454jxyPso8Gju0f6nFC5vj2ABC5Nhx%2B%2FHJ0tCEAADYHgIPso6O9iqOjg0pYZMAx7m6%2Ff2LTx50x1ABc9zpGPTSUx8V%2FS%2F8BcpA73MifEwcAAAAJcEhZcwAACxMAAAsTAQCanBgAAAclSURBVEgNvVZZbFTXGf7uePZ9wePxhuMF48QDRkANMTGCPhQs9aHCMlWlviSNEOoDqSuooFLklCKUtggjVCOj8AIPBFEgRiKhIEoJKopdA8UxOLbHS7yOPZ7F41k8653%2B%2F3VnGkJSUUXtke69M%2Fec8y%2Ff9%2F3%2FuUImk8H%2Fc8i%2FizNBEPLOnTv341AoZAmHw1AoFCgrK8PevXsRDgYx6HL1bNlS%2F4hyymUl%2FLcZ%2FhLQVHd2bifDTQUFBc50Ov19g8Eg5OXlIR6PY3h4GO6ZKSS9U4BvYgRFJdt%2F8et2dzaxb8yQIrSWlJSYq6qqNmg0GmuGUkmStYlTp%2BzlTueeH7z%2Ffr3Fas2j10ilUhBFUbLHT7PZjFDoVaTEDP5y8czq%2BNCTSpp80SFtlp88eXKj0%2BlsPnLkyHaKeo1MJrMplUqw4TTt6vr4YwQ%2F%2BgjRt9%2BGfvNmpBOJbOC5J2dqtVqhUKnhWF2lnJwd2kyTf8sukN%2B8eVN1%2FoMPKm7dutVaW1v7Q51OV8gwZyPPQq4kfra%2B8w5u37sHV1cXHFu3fqNDNsyZiuk07KsrMPDXRCXFS9St8Ch39dw7rhGWm7U6fZler0c0Gs0G89wznUwif80amJ1OTJLTBImEiAPIEiNAaEAul0vPBGWeEdOwOUqh1hkbPvnkphJoirNBWd%2FnvRcyKkPBzMw0kmT0q4MN8JUbZNSycSMCLheCo6OQUdY8eN%2Fk5CRu3LiBo0eP4urVq5Jjk9UGuc6S%2F%2FTG7y1ZG7Kqmtem0%2FGoe37eQ8Hm1CvN9%2Ff3Y2BgQNrMcypyULRtmzTn7ukhnlTw%2B%2F1obW3F4cOH0d3djWvXroFLhDPWaLUwrLIXK0VdXc7hkeN%2F9CGTfuL3eRGLxSR4mPjx8XFcunQJFy9eRCAQWIGNnNpra2GiWpt%2B8ABpUiiJC4cOHcKFCxdw4MABFBYWYteuXWBYGR1bcbnMtxgsyznkHzJRHAl4vSTnkBQZk15cXAy73S7BZTQac9nrSIGO11%2FHfG8v4ouLUFKW5eXl0FI2XSSmyspKlJaWguqT1YP8klegVmoaWTiSL76lYuEHoaVF%2BAgehoLh43oqKirClStXcOfOHajVal4KBZVJUUMDwvPzCI6NQUZosPHl5WWQ0rFnzx5pv1RKJJxVjmKIcnX5e%2B%2F9hhRGyfHNUVzw5XI4GGceeSEPzpJhbWpqwtmzZ7GwsCAFI2NYN2wAw%2B7p64NAvHJLe%2Fz4sVRK24hjhpLfZciG0WKDQm9aW5GaLmW7kkOjWj6aSsRHFxY8ua7BUft8PjQ3N6O%2Bvh6nT58GNwEKH1riyVRRgfmHD9kG8giV69evYzM1g8HBQZw5cwZtbW0S91RuMOYX2sbGhv%2FtsK3jclSeSU%2FMud0S2ZwlZ8gKnJiYkIRx%2Fvx59JAyVeRUodPBvn49PE%2BeQCShBYjLXuL0%2Fv376OjowNLSEhobGyVeZTKBeCwX5HmyjRxctsjEVCL2d793oSkSiRJ%2FJomX2dlZ3L59G7t378b%2B%2Fftx7NgxXPrwQ8iIT8eWLRiluajHAyUJqb29HQ6HAzYbQUhwcsCsVMIVBaXUcQTFenYoQco%2FzEb900W%2FV8qKhcMi4O5P%2FRX79u3DwYMHJUi7CDretGrdOojUlRZJOCpS6Dr6b7FYpEC5vHgvD25xFnshdSVVzWef%2FUmTzRDKTOyZL4Qlj8djrKlZu4I%2FGWLesu2O4eKRos6iLSiAkpTsI8hL6J3UzohfHpwdj6ziDWYbtGZbzd3Odmsuw9o6Jx1iidlZ96wUJUd74sQJcA3y4FLhU4AvFgk0GoC4nCGlptkB8c7KZTjpSCP%2BdFCpNVSnapgoMKO9WGsp2%2FSTXIY%2Fb9ux%2FOedjwbn5tw13Bvp1EB1dXXu1GCnrFx2zKLSmEywb9qE5MgIlFQGoiBDJLqMgN%2BDUMCHWDgIMbkCq0yhhj%2B8rEqFQn%2FIOQRa0gr5qUf0afCjOJHNauQjimHhS%2BDrXzUqASdXIEoBJKemMPK0H1PDfYhNUd%2BNeCFLxcOimI5G48nhcDIzNB2MD7m8ic9rnK%2FOfcUhYR8Pf1FV8Ypo0BuovulMI3mEIhEEqM%2BGAl6komGQnDlZglRHUYeRnpwUP%2B38rctmFMaMet1DQaX%2F0psSHkV0Vf7uhrr5yy0tz53SzzkMLYX7hXQqIkIwuAYHMP2M%2BuXMEGTRAPLEeCKZSE0nM5lJbzjpfuqPfGobny8yZcRf5cdNLW%2FuuDyQaZE%2BDFYC%2Bpb7cw4bt%2B2e%2FcfD7qGgZ6pScH8xXaiT9%2Bn0BndQTPWKxsLxiNI6cSBx3IcOicrM7wRFg6lu%2FZt2EtjLOOMYXvhq2%2Fm915yVNnPspz9rndvR0hL%2BlkCl1511dc7SN96o1jocQzvffffZf1qbnXvBYXbiZZ4jIyOq4N27ar1cLq59663Qy%2Bz5Tg5fxsHX1%2BQK%2F%2BsT%2F6v%2F%2FwSX%2B1xwr1DS6QAAAABJRU5ErkJggg%3D%3D',
	btnGrad = 'data:image/png;base64,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';

var attributeNameMap = {
    'className': 'className',
    'for': 'htmlFor',
    html: 'innerHTML',
    text: 'textContent'
};
    
var Element = {

    create: function ( tag, props, children ) {
        var el = document.createElement( tag );
        if ( props ) {
            Element.setAttributes( el, props );
        }
        if ( children ) {
            for ( var i = 0, l = children.length; i < l; i += 1 ) {
                el.appendChild( children[i] );
            }
        }
        return el;
    },

    setAttributes: function ( el, props ) {
        for ( var prop in props ) {
            if ( props.hasOwnProperty( prop ) ) {
                var name = attributeNameMap[ prop ],
                    value = props[ prop ];
                if ( value ) {
                    if ( name ) {
                        el[ name ] = value;
                    } else {
                        el.setAttribute( prop, value );
                    }
                }
            }
        }
    }
};

window.addEventListener( 'DOMContentLoaded', function () {

// An iterator that returns all text nodes which do not just
// contain white space and are not a child of style or script elements.
function getIterator ( root ) {
    var NodeFilter = window.NodeFilter,
        Node = window.Node,
        target = root || document.body;
    return document.createNodeIterator( target, NodeFilter.SHOW_TEXT, {
        acceptNode: function ( node ) {
            if ( /^\s*$/.test( node.textContent ) ||
                    node.parentNode.nodeType !== Node.ELEMENT_NODE ||
                    	node.originalTextContent) {
                return NodeFilter.FILTER_REJECT;
            }
            while ( ( node = node.parentNode ) !== target ) {
                var tag = node ? node.nodeName : 'SCRIPT';
                if ( tag === 'SCRIPT' || tag === 'STYLE' ) {
                    return NodeFilter.FILTER_REJECT;
                }
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    }, false );
}
    
// 2. Check the language of the page.
( function() {
	
    var text = '';
	
	function getContent(type) {
		var els = document.querySelectorAll( type ),
			eltext;
		for ( var i = 0, l = els.length; i < l; i += 1 ) {
	        if ( i ) { text += ' '; }
	        eltext = els[i].textContent.replace(/\s\s*/g, ' ').trim();
	        text += eltext;
	        if ( text.length > 800 ) { break; }
	    }
	}

	getContent( 'p' );
	if( text.length < 200 ) {
		getContent( 'h1, h2, h3, a' );
	}
    if ( text.length < 200 ) {
        text = document.body.textContent
            .replace(/\s\s*/g, ' ')
            .slice( 0, 800 );
    }
    if( text.length >= 200 ) {
	    opera.extension.postMessage({
	        action: 'analyse',
	        data: {
	    		text: text.slice( 0, (text.length>800 ? 800 : text.length) ),
	    		protocol: window.location.protocol
	    	}
	    });
    }
}() );

var transactions = [], // stores translate transactions
    isTranslated = false,
    initialTransactionsExpected = 0, transactionsReceived = 0,
    div, label, 
    translateButton, cancelButton, closeButton, optionsSelect,
    ajaxTranslator,
    keyTriggers = {ctrl:false,shift:false},
    fromLang = { code: '', value: 'Unknown' };

function createTransactions( target, inline ) {
	var iterator = getIterator( target ),
		transactionsList = [];
	
	function chunkTarget () {
		var strings = [],
			len = 24, // includes standard overhead 'v=1.0%26langpair=en%7Cto'
			overheadContent = 5, // translation overhead per item '%26q='
			textnode,
			nodeList = [],
			maxSegments = 100,
			segments = 0;
		
		while ( ( textnode = iterator.nextNode() ) ) {
			len += overheadContent + encodeURIComponent( textnode.textContent ).length;
			if(len > 4000 || segments++ == maxSegments) break; // Google Translate chunking limits
			textnode.originalTextContent = textnode.textContent;
			nodeList.push( textnode );
			strings.push( textnode.textContent );
		}
		if( nodeList.length > 0 ) {
			var transactionId = createTransaction( nodeList, strings, inline );
			transactionsList[ transactionId ] = transactions[ transactionId ];
			if( iterator.nextNode() ) {
				iterator.previousNode(); // back up one place 
				chunkTarget();
			}
		}
	}
	
	chunkTarget();
	
	iterator.detach();
	
	return transactionsList;
}

function createTransaction( nodeList, strings, inline ) {
	var transaction_id = Math.floor(Math.random()*1e16);

    // Store transaction
    transactions[transaction_id] = { 
		"inline": inline || false,
		nodes: nodeList,
		originalStrings: strings,
		translatedStrings: []
    };
    
    //opera.postError('Transaction created: ' + transaction_id);
	return transaction_id;
}

function cleanup () {
	transactions = [];
}
    
function hideMessage () {
    div.addEventListener( 'oTransitionEnd', function() {
        document.body.removeChild( div );
        div.removed = true;
    }, true);
    div.style.top = '-34px';
    document.body.style.top = '0';
}

function showMessage ( data ) {

    fromLang = { code: data.langCode, value: data.language };
    
    // Collect strings before we modify the DOM
    var initialTransactionIDs = createTransactions( document.body, false );
    for(var i in initialTransactionIDs) initialTransactionsExpected++;
         
    div = Element.create( 'div', {
        style: 'color: #000; position: fixed; height: 24px; top: -34px; left: 0; right: 0; padding: 5px 10px; background: url(' + imgLogo + ') no-repeat 10px 4px #CACDD5; color: #000; border-bottom: 1px solid #000; z-index: 999999999999; font: 12px/20px "Lucida Grande", Arial, sans-serif; text-align: left; -o-transition: top 0.3s ease-in-out;'
    }, [
        label = Element.create( 'span', {
            style: 'padding: 0; padding-left: 34px; margin: 0 8px 0 0;',
            text: 'This page appears to be written in ' + fromLang.value + '.'
        }),
    
        translateButton = Element.create( 'button', {
            text: 'Translate',
            style: 'padding: 1px 5px; margin: 0 8px 0 0; border: 1px solid #888; border-radius: 5px; background: #eee url(' + btnGrad + ') repeat-x; display: inline; text-shadow: 1px 1px 1px #ddd;font: 12px/20px "Lucida Grande", Arial, sans-serif;'
        }),
        cancelButton = Element.create( 'button', {
            text: 'Nope',
            style: 'padding: 1px 5px; margin-right: 0 8px 0 0; border: 1px solid #888; border-radius: 5px; background: #eee url(' + btnGrad + ') repeat-x; display: inline; text-shadow: 1px 1px 1px #ddd;font: 12px/20px "Lucida Grande", Arial, sans-serif;'
        }),
        optionsSelect = Element.create( 'select', {
            style:
                'position: absolute; right: 36px; top: 6px; padding: 2px 0; font: 12px/20px "Lucida Grande", Arial, sans-serif; text-align: left; color: #000;'
        }, [
            Element.create( 'option', {
                text: 'Always translate ' + fromLang.value,
                style: 'padding: 2px 0;',
                value: 'always',
                selected: data.preference === 'always' ? 'selected' : null
            }),
            Element.create( 'option', {
                text: 'Ask before translating ' + fromLang.value,
                style: 'padding: 2px 0;',
                value: 'ask',
                selected: data.preference === 'ask' ? 'selected' : null
            }),
            Element.create( 'option', {
                text: 'Never translate ' + fromLang.value,
                style: 'padding: 2px 0;',
                value: 'never',
                selected: data.preference === 'never' ? 'selected' : null
            }),
            Element.create( 'option', {
                text: '-----',
                style: 'padding: 2px 0;',
                disabled: 'disabled'
            }),
            Element.create( 'option', {
                text: 'More options...',
                style: 'padding: 2px 0;',
                value: 'more'
            })
        ] 
      ),
      closeButton = Element.create( 'div', {
          text: 'X',
          style: 'position: absolute; right: 10px; top: 7px; padding: 1px 4px; color: #EEE; font: 10px "Lucida Grande", Arial, sans-serif; cursor: pointer; border: 1px solid #666; background-color: #666;' 
      }),
    ]);
    
    optionsSelect.addEventListener( 'change', function () {
    	if ( optionsSelect.value === 'more' ) {
    		opera.extension.postMessage({
 	            action: 'openPreferences'
    		});
    		optionsSelect.value = data.preference;
    	} else {
	        opera.extension.postMessage({
	            action: 'setPreference',
	            data: {
	        		selection: optionsSelect.value,
	        		fromLang: data.langCode
	        	}
	        });
    	}
    }, false );
    
    translateButton.addEventListener( 'click', function () {
        if ( isTranslated ) {
        	// remove AJAX change listener
        	document.removeEventListener('DOMNodeInserted', nodeInserted, false);
        	
        	for(var transaction_id in transactions) 
        		translate( transaction_id, true );
            cleanup();
            hideMessage();
        } else {
        	for(var transaction_id in initialTransactionIDs) {
	    		opera.extension.postMessage( {
	                action: 'translate',
	                data: {
	                	id: transaction_id,
	                    strings: transactions[ transaction_id ].originalStrings,
	                    "fromLang": fromLang.code
	                }
	            });
        	}
            label.textContent = 'Translating page from ' + fromLang.value + "...";
            translateButton.style.display = 'none';
            cancelButton.style.visibility = 'hidden';
        }
    }, false );
    
    cancelButton.addEventListener( 'click', function () {
        cleanup();
        hideMessage();
    }, false );
    
    closeButton.addEventListener( 'click', function () {
        cleanup();
        hideMessage();
    }, false );
    
    // Auto-translate.
    if ( data.preference === 'always' ) {
        translateButton.click();
    }
    
    var body = document.body;
    body.style.position = 'relative';
    body.style.OTransition = 'top 0.3s ease-in-out';
    body.appendChild( div );
    
    setTimeout( function() {
        body.style.top = '34px';
        div.style.top = '0';
    }, 0);    
    
    // Add show/hide translate bar toggle
    document.addEventListener( 'keyup', function ( e ) {
    	keyTriggers.ctrl = keyTriggers.shift = false;
    }, true);
    
    document.addEventListener( 'keydown', function ( e ) {
    	if ( e.which === 17 ) { keyTriggers.ctrl = true; }
    	if ( e.which === 16 ) { keyTriggers.shift = true; }
    	if ( ( e.which === 88 &&
    	    keyTriggers.ctrl === true && keyTriggers.shift === true )
    			&& !div.removed) {
    		if( div.style.top === '0px' ) {
    			div.style.top = '-34px';
    		    document.body.style.top = '0';
    		} else {
    			document.body.style.top = '34px';
    	        div.style.top = '0';
    		}
    		return false;
    	}
    }, true );
}

function decodeEntities ( string, div ) {
    div.innerHTML = string;
    return div.textContent;
}

function translate ( transaction_id, reset ) {
	document.removeEventListener('DOMNodeInserted', nodeInserted, false);
	
    var translatedStrings = (reset ? 
        						transactions[transaction_id].originalStrings : 
        							transactions[transaction_id].translatedStrings),
        l = translatedStrings.length,
        temp = document.createElement( 'div' );
    
    if(!reset) transactionsReceived++;
    
  	for(var i = 0, l = transactions[ transaction_id ].nodes.length; i < l; i++ ) {
   		transactions[ transaction_id ].nodes[ i ].textContent = decodeEntities( translatedStrings[ i ], temp );
   	}
    
    //opera.postError("Initial transaction completion: " + transactionsReceived + " of " + initialTransactionsExpected);
    
    if(transactionsReceived == initialTransactionsExpected) {
        // Update bar to say it is translated.
        label.textContent = 'This page has been translated from ' + fromLang.value;
        translateButton.textContent = 'Show Original';
        cancelButton.textContent = 'Done';
        translateButton.style.display = '';
        cancelButton.style.visibility = 'visible';
        
    	isTranslated = !reset;
    }
    if(transactionsReceived >= initialTransactionsExpected) {
    	document.addEventListener('DOMNodeInserted', nodeInserted, false);
    }
}

// AJAX Translate functionality
function nodeInserted( evt ) {
	// Don't process Popup Statusbar Extension inserts:
	if( evt.target.id == '_opera_extension_$_popup_statusbar_' ||
			evt.target.id == '_opera_extension_$_popup_translatehover_')
		return;
	
    // get the chunked transactions
    var ajaxTransactionIDs = createTransactions( evt.target, true );
    
    // send transactions
    for(var transaction_id in ajaxTransactionIDs) {
	    opera.extension.postMessage({
	    	action: 'translate',
	    	data: {
	    		id: transaction_id,
	    		strings: transactions[ transaction_id ].originalStrings,
	    		"fromLang": fromLang.code
	    	}
	    });
    }
}

function fail ( transaction_id ) {
	if( !transactions[transaction_id].inline ) {
	    label.textContent = 'Oh dear! The translation could not be completed.';
	    translateButton.textContent = 'Try again';
	    cancelButton.textContent = 'Never mind';
	    translateButton.style.display = '';
	    cancelButton.style.visibility = 'visible';
	}
}

opera.extension.addEventListener( 'message', function( message ) {
    switch ( message.data.action ) {
        case 'analysisFailed':
            cleanup();
            break;
        case 'inNativeLanguage':
            cleanup();
            break;
        case 'showMessage':
            showMessage( message.data.data );
            break;
        case 'translate':
        	transactions[message.data.data.id].translatedStrings = message.data.data.translatedStrings;
            translate( message.data.data.id );
            break;
        case 'fail':
       		fail( message.data.data.id );
            break;              
    }
}, false );

}, false );

}());
