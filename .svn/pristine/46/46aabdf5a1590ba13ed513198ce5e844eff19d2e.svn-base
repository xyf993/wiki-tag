/**
 * Copyright (c) 2014-2015 Baidu, All rights reseved.
 * @fileoverview 瀑布流业务层交互逻辑
 * @author GuZhihui | guzhihui@baidu.com
 * @version 1.0 | 2015-03-01 | GuZhihui    // 初始版本。
 *
 * @method prepareParams()         // 方法：生成瀑布流初始化数据。
 *   @param No                     // 参数：无。
 *   @return {Object}              // 返回：瀑布流初始化参数。
 * 
 *
 * @method initWaterFall(params)   // 方法：初始化并启动瀑布流。
 *   @param params {Object}        // 参数：瀑布流初始化参数(可选，默认无，参阅下文详述)。
 *   @return No                    // 返回：无。
 * 
 *
 * @method changeParams(params)    // 方法：重置瀑布流。
 *   @param params {Object}        // 参数：瀑布流重置参数(可选，默认无，参阅下文详述)。
 *   @return No                    // 返回：无。
 *
 * @description    // 附加说明。
 *   1) 本组件供瀑布流业务层调用，专门用来封装抽出。
 *
 * @example    // 典型的调用示例。
    var createWaterFall = require('wiki-tag:widget/waterfall/createWaterFall.js');

    createWaterFall.prepareParams();          // 生成瀑布流初始化数据
    createWaterFall.initWaterFall(params);    // 初始化并启动瀑布流
    createWaterFall.changeParams(params);     // 重置瀑布流
 */

var $ = require('wiki-common:widget/lib/jquery/jquery.js'),
    jsonStringify = require('wiki-common:widget/util/string.js').jsonStringify,
    scrollTo = require('wiki-common:widget/util/scrollTo.js'),
    JSmart = require('wiki-common:widget/lib/jsmart/jsmart.js'),
    waterFall = require('wiki-tag:widget/util/waterfall/waterfall.js'),
    nsLog = require('wiki-common:widget/component/nslog/nslog.js');

var fromLemma = $('#fromLemma').val();
var isFromLemma = (fromLemma === '1');
var page = $('#page').val();
var isPage = (page === '1');
var limitNum = $('#limit').val();
var top = $("#category").position().top;
var img1 = 'data:image/gif;base64,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';
var img2 = 'data:image/gif;base64,R0lGODlhZABkAOZVAKurq/7+/vr6+qysrK6urq2trf39/a+vr7a2trCwsLGxsfv7+729vfb29vj4+Pz8/Pn5+fHx8dLS0ujo6LS0tLKystnZ2ff398HBwfX19bq6uvPz87u7u+bm5sPDw76+vvDw8NjY2Nra2s7OzrW1teDg4Li4uM3NzcvLy+Hh4cDAwOLi4tzc3OXl5dHR0ePj4+np6by8vN7e3u7u7tvb28/Pz8jIyN/f3+3t7d3d3bOzs9fX19DQ0MzMzNPT0+rq6tTU1Lm5ucbGxu/v78nJyfT09PLy8sTExNXV1eTk5MfHx9bW1re3t8LCwr+/v+vr68rKyufn5+zs7MXFxaqqqv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1RDk0OUFDMkUxMjA2ODExODIyQUU0NTVGOEQzMjRGMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozQkVGNDlGQUY3MTExMUU0ODE4NDk0MTAwOUQyQ0Q3OSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozQkVGNDlGOUY3MTExMUU0ODE4NDk0MTAwOUQyQ0Q3OSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkIyRkUxQUIwODIwNjgxMTgyMkFCMDk4MTk1RDlEMEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUQ5NDlBQzJFMTIwNjgxMTgyMkFFNDU1RjhEMzI0RjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJDwBVACwAAAAAZABkAAAH/4BVgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHSqA8TKTjTjC0VVN0xRdmIUgDd5QgL4YYY5ewi6YUF7OVT74Tx8lQFK/WCHvhUBKioiFBvxgB5TC6MADDABbp0ExSUU9FA0BAGVHTsS1eCigWChW5IHFjIwUNmIag4QCRgYcMFAlxwo4LAQoBlNQYsukilgkR5Tk4eE0KhkQxy/6Ao+8Cg0Yt/3QCAQ0ZCSCMoULuxSDagRiN/WX0gc0AlxNWsVGggG0KlRKMUaLmNIItCBQajDWD/KUlGg8oEA4ke+CgAQMhMdjEEHOvgBCkBInILvaBAJQY2Bz0OdKuA5IGxAD3+6RsUQQUVBTJuDgqQoSIyHlkBwBDAAwCAEYqhsUWrgJuTIdNQoO2WIEU4BMOpeA2nebiNdDqSn0h3JPmNdC2GH8gdrgnare8gcIDKg1+VBxICmtto/vwEGTdmqG5Pv779+/jz69/Pv7///wAGKOCABBZo4IEIJqjgggw26OCDEKYTCAAh+QQJDwBVACwAAAAAZABkAAAH/4BVgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1pQBzSAyKQ2PT00FACQSAsgLU1TqAECNLADq8Qjexkfx8TuLUvD36gzGM/rFo6ABg5IRQESU6IBjAwaB8WAUowGRCgYMGigQqFgRycSKQwgZaADiRxIZHKnUKBYBooJsiRBwZGEMhcAbi4BULODAWAAXA9QRyMFoQRCIFpIJmHAAg6MGTu4VoMHsBIAMjnxQ8SAhR09mAZc0AjGAA8xnQRAwCsAAQMhoFrSo/FhEUcI0BwOIKMpAAMEDalMILEjkgYpEai2oyECUggoKawEq/KtigBAEBRUgXHNBhcHGBCpeVCFCRbQ1AR8gcqBy5FqA1BUBFLkmIiWVENdI2K5wVtoQ2+pAVOsAnEqHajCKT6h2ATiAr9RU2HZqbUjQ2DOuVZHBrx8Aotqr/GDSD8Hy8IIC/NhRA8mE3ujjy59Pv779+/jz69/Pv7///wAGKOCABBZo4IEIJqjgggxyEggAIfkECQ8AVQAsAAAAAGQAZAAAB/+AVYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPDASwaAwQeUtSIBhhU4eEAOd2GEuLpAxHmgwYH6ekj7YIg8ekx9FUt9+Ic5gZWqOgnrge1DS4UUElQA0U/AEOUOcghgUUDQQZegKPyocSDKg8+3KOhrAO8cAVCSKhA5cAIEIUM7EAAgIqGCcoiDOgX48bHRDmosFN2oh+GRkioLFjGoB+CRigOMHPSL0gjDFaX7egnoZEJD8weaIhHAkIjAieaQbCxMxwHs4u8BFBZ8mxBEQhCbF5YZK+EtAAOERRR1IEKDGouqOgYeogFlQ3dllBRMAORDyoGzLEAcOCHoAA3VCgoQKAATHMpBhRo0YDDPQA72nUoMEAHQSpI2v1oSxBA5W4Nat6mYsPcjeHhpHYDgjwc3GkWmlMR0C1KcwoAFQ530U7E8AR729kgWACHvgA7CsQL8ltfFQgyTkABMiGA+/v48+vfz7+///8ABijggAQWaOCBCCao4IIMNujggxBGKKEmgQAAIfkECQ8AVQAsAAAAAGQAZAAAB/+AVYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9CHCzIjIyUP0Yw/ClTdVBQ42YlGBd7eCRnih0Lm5j3qhgTt3jrwhAvz3gD2hAn5VAj4DTrxT4JAQRe4tUsg4GCVByQAmCNAwIFDCVRE4GCRY0gUKjUODgHAIEAhDAM28AvAYUAEQyOF8AtBBQgiKFSkwNtQwIQBRBkKMICnAoDORBhfiJNBZcQiAQoQ/HQmoEiGBBQWMKKRsdkGDBIlJmlkgEkCCz6WTDBpLINCbxi02CrKwKGdjhTGbORbsQiEv3wuih3IR0TRAgr/upUgJnHeFEVAEnejMDVY3XlBfNz40cAQAsndYAxbMQ/AWyo9PdQQQRo0lR3EdjSmouDJQxAtLIxowmSAa28+im0I4UJGQ0QBMsCYnViGPQyui9ibAPqIQBSJFaRbiX0eCRAOq0w4Io9KkB1aww+CUFm9+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCao4IIMwhcIACH5BAkPAFUALAAAAABkAGQAAAf/gFWCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Qg0Y+QlA3BtGMIgBU3VQmG9mJK97lCAvihyTl5RbphRHs5RjvhE/y3hz1gw343Ur7BjnxJyGgoAgH5A2gMuWCQRAVvA3gcYEIlQQ3DNpQ8GIChEEddFBpkmHfhxiHBJygQoBGgHcUhCT6gYCKEyOCVnhAYELJhGUBJip6wANAgSVN5BHBhuwCFXeLcJjwRwVFMhxUXjRKQpXKDGRcpTSy0ZUHMhFUSjLi0NUDsqIvtNd2lXlMCQVHPboiQfaBAaMASRhQLVDE2AMYClTEPdQAicgDGvyJMEYjYTcSHQxNmMKNg4wFASRw81YAKjEf8gCsEAQhRM0CKHAU2rBEiY0QDYyBGM3uQBQiC02IECDORdcBSn7UO0L1g8N9QqguMUiD6hODAkTKc2JQEIgE7Ezk7l7lgosgCTQsQUe+vfv38OPLn0+/vv37+PPr38+/v///AAYo4IAEFmjggQgmqOCCDC4YCAAh+QQJDwBVACwAAAAAZABkAAAH/4BVgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TVgxcyEkBJBtaGARIDVONUOi3IBh0iJRmNAUfk8VQlxlE65AAn3Yos8vEFRYj9ECdPyCIE/uK5IGYiIZUJhQRcKDKkhUNyMYaBuJjABIkEBS46pDCsA8cjSnrUkLBDRI4VMkRS4TBMykUbihBe5DHMQAWH9BLluEig3bASCRkEWCTEYQpjNAjE++CAETiC43R0QObAQg8MVEI4ChBkwAkgHfYpC2DiQFVGFq6oLIkWhcoIRhkImFD7rAkAI4s8UHkyDQSAI4pWUOlRrQcVGIgEVKggoNoFAhyWGnK8wtsSKjcMPaHiwVuVBxR0PKgCIYMBAyaKmq6CVImGcZipWJhdJcA9eQOMmraZUAVvGxcjzGZyMag35kBnI3eofLhD47yR+GPSgLegF0HGFYDy1rsgB0X4ml/Pvr379/Djy59Pv779+/jz69/Pv7///wAGKOCABBZo4IGxBAIAIfkECQ8AVQAsAAAAAGQAZAAAB/+AVYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9COFxfRjg9IFVRUFUAL1YkCMdrjVBwC34dE5ORK6IUNAOvkG+6DJfLkMvWCLPjjIfuq5PCn7cW+KAQIEvDmjgaAAzz80XAX4AQVEhGqWIg3DsASdwIwUGHgYJARCRgQUMHhboMJKkQMHJJBxQi6JwqoIEkUhcqPZRdqkCBgYkSDKiUGFDCYaAaVFcpwJFh3QF0FloouUBGRTEA2fEEyMAoAQEKyHQRdOKoAJZkKggy8HGnAkEwDQSaOmmhIdoTgB0coFCS7R/DIBEY+qARAFoABPiYoClBhQoOhIQEWOyw+5sDJOgbUIIQgQeVADXqDAuw4MI5Ji2QtahxBkWSzoABJ3gJoEmXxCHxQ0UU4kRBBDX8JLH8TYEElwRQBAwQhCCRgFQ8EAQa0QHCGda/4mlgXhCMnOQ4lx1dxIEEDBQYiZKqfT7++/fv48+vfz7+///8ABijggAQWaOCBCCao4IIMNujggxBGKOEhgQAAIfkECQ8AVQAsAAAAAGQAZAAAB/+AVYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3OwRAQz5AGISRUVBRID9OLDx/Y4VROAt2JPeLiSuaHFwDp4hvshSvw4jLzhDn24SH5g1H4YVvxT9ADBfwASCtYZR8/HgwF7XgXDoALDVSWRKzCIEGTDyOGVHGAgAoLhgEOQDGUQQeAFAUjUMlxKIKCAR3+yaAi8hCOAwWe5ENBIEAiGAMOgJhnQsWiFgAUyOsmAIAPRiWokGgwI0WHcswmUGnRyAKVAuEK+FuGhIqDRgK+DsCzsKwJAkdA7BVYiCwBEUcx+CUxdiHEFHAQG5W0B5PYDQLphCxIJKADD7n2egpLwQ9DoQVRJMR4B2BxuhjEFiQQWOIBDB8fBlABoKFGi3J5xVGYulkglQOyqZgYkYTvoAlHEHBAMpmYC98ATqx4O4+H7wMMb/j+wFAAZH40GbLgx8BoxBAUwzkxztCIiw8xbCQxv7G+/fv48+vfz7+///8ABijggAQWaOCBCCao4IIMNujggxBGKOGEFN4SCAAh+QQJDwBVACwAAAAAZABkAAAH/4BVgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NGRAUk9Rygt0osNDFTe3h8X2ocPQd/nGg/jhSHn7iLrhBru5wzxgwn03wr3gjr63ij0q2IDoDcnLwLEmwFAHwAU+SiEgLBOBD0ALKo8yGGCCoEeEQxdeJHCiLIJMb7FgFFogoeGGDooDMCjoTcPFJNtAFAj0YYaB6ggoNGDXgwDyoJ8WCRABAKDN5SdKIB0UYCi+pQoS0HlSSMkAJsoy0BlR6MXAF0so+Ch0QMC9LoGbFhmIwEjARio2PQGoAQzFlRCJspgTkkGHhpMEJnRDASVHIlmVKDiY1yABEQQtSAwIOo6DyQOiQCQgGW8HVRovCgiKMAIKiQEr2vx79sHKUeoxBB32iGVKeri/TBYoEE/FQYp31uwV5+Ge0aSU7Ebr4H00PcoJM98r53BH/0MdNM3YmCVBR7cAZBgftCPER48+DDZvr79+/jz69/Pv7///wAGKOCABBZo4IEIJqjgggw26OCDEEa4TiAAIfkECQ8AVQAsAAAAAGQAZAAAB/+AVYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1daOBiweDCcR14YLDFTjVAUtyQEROA6PJ+TkCRDGARYV5B8zjAYE7+Qixjb6URlwDlGDCUgEjqtRjIVCKvEEZZhgAQWDBA/JhSjGJGOMGPzGHYiBwkKUIgH7DShCzEHGgR96iJjQwFADEv1oFGvwsgkjCDWoEPAwYV5IhSMadaDyIhmUjFIanRggIFkDBQqhOKKgYlkEE/0IgGgEgooFZgFe8CDiwweVCmOyF+2gYkSaDAAK8in6wIRaCgAHcCSCAIBHtRcDDjxBVIIKDGstBhR4bEjIAQPXohQo0KGQgQNCvlX5QWBAEggdbsBYekN0lScHAAAgN5ulaAc4BWqo+s1DRhvfZryke23J8LPWUAxnaG3EcAnXUgwvWO0B1ocUMF978RBAUdEpjo5L0NR1lQtAVGhQsYOd+ffw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCaooH2BAAAh+QQFDwBVACwAAAAAZABkAAAH/4BVgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHSrzBOAwVCEdOKKQBU31QFT9uHAgfg4Brkhivo6BvrhCzu4OPxgjD0VAAO94ICBegp8VdFwAcqBNCZEOBPAAMqKCBYEGIDwIiGD3sUUkHhnkMqGgvRoIJj3ccThxoAkOAMhgQbJ24sKBiDCkpEDBAwi8DB3QEWPW8iskAFhDIQCfR9u6ioCBUgyQIEUfqt5CIOQZIlofptCqMlVIwgQ8EVYYBFRqgsQaaiLJULjLdMcEB2xC3DRVCo6KjghIWBYUDKFkDy5O+hACfocWggbIM3qgq+EWgSYsbZQT6UajAMzAVVBAsalIBC4VuCKSIiNBhANYewAET0kYBHaEMOJRUkc8VALIUGcApc3EUUQQQJriSMOZix4TIjCVyZ3NtKlcg9A6WVSvH3gzU9lgR/IEBXIATBQQY6AJFwo9/59/Djy59Pv779+/jz69/Pv7///wAGKOCABBZo4IEIJqjgggw26GAhgQAAOw==';
var src = isPage ? img1 : img2;
var createWaterFall = {
    waterfall: null,
    prepareParams: function() {
        var tagIds = [],
            postParams = {},
            limit = limitNum,
            contentLength = isFromLemma ? 38 : 40,
            currentTagId = $('#current_tag_id').val();
            
        $('#category .selected').each(function() {
            var tagId = $(this).attr('data-value') || 0;
            tagIds.push(tagId);
        });

        postParams = {
            limit: limit,
            timeout: 3000,
            filterTags: jsonStringify(tagIds),
            tagId: currentTagId,
            fromLemma: isFromLemma,
            contentLength: contentLength
        };

        return postParams;
    },
    initWaterFall: function(postParams) {
        var self = this;

        if (isFromLemma) {
            self.waterfall = waterFall({
                host: '#waterFall',
                itemCls: 'waterFall_item',
                params: postParams,
                isPage: isPage,
                maxPage: 100,
                colWidth: 170,
                gutterWidth: 12,
                gutterHeight: 20,
                bufferPixel: -30,
                checkImagesLoaded: false,
                isAnimated: true,
                loadingMsg: '<div style="text-align:center;padding:10px 0; color:#999;"><img src="'+ src + '" alt=""></div>',
                tpl: __inline('./waterFallTpl.tpl'),
                path: '/wikitag/api/getlemmas',
                callbacks: {
                    loadingFinished: function($loading, isBeyondMaxPage) {
                        $loading.css({
                            "position":"static",
                            "margin":"auto",
                            "top":"0",
                            "left":"0"
                        });
                        if (!isBeyondMaxPage) {
                            $loading.fadeOut();
                        } else {
                            $loading.remove();
                        }

                    },

                    loadingError: function($loading, $message, xhr) {
                        $loading.css({visibility: "hidden"});
                        
                        switch (xhr) {
                            case 'error':
                                $message.html('加载失败，请重试~');
                                break;
                            case 'none':
                                $message.html('暂无数据，敬请期待~');
                                $message.css({
                                    "position":"absolute",
                                    "top":"10px",
                                    "left":"50%",
                                    "margin-left":"-20px"
                                });
                                break;
                            case 'end':
                                $message.html('已经没数据咯~');
                                break;
                        }

                        (xhr == 'end') && $message.fadeOut(2000);
                    },
                    renderData: function(data, dataType, tpl) {
                        var template;

                        if (!data.lemmaList.length) {
                            return false;
                        }

                        if (data.page && data.page > 0) {
                            var nslog = nsLog({
                                type: 8999
                            });
                        }

                        if (dataType === 'json' || dataType === 'jsonp') { // json or jsonp format
                            template = new JSmart(tpl);
                            return template.fetch(data);
                        } else {
                            return data;
                        }
                    }
                }
            });
        } else {
            self.waterfall = waterFall({
                host: '#waterFall',
                itemCls: 'waterFall_item',
                params: postParams,
                isPage: isPage,
                maxPage: 100,
                colWidth: 184,
                gutterWidth: 15,
                gutterHeight: 20,
                bufferPixel: -30,
                checkImagesLoaded: false,
                isAnimated: true,
                loadingMsg: '<div style="text-align:center;padding:10px 0; color:#999;"><img src="'+ src + '" alt=""></div>',
                tpl: __inline('./waterFallTpl.tpl'),
                path: '/wikitag/api/getlemmas',
                callbacks: {
                    renderData: function(data, dataType, tpl) {

                        var template;

                        if (!data.lemmaList.length) {
                            return false;
                        }

                        if (data.page && data.page > 0) {
                            var nslog = nsLog({
                                type: 8999
                            });
                        }

                        if (dataType === 'json' || dataType === 'jsonp') { // json or jsonp format
                            template = new JSmart(tpl);
                            return template.fetch(data);
                        } else {
                            return data;
                        }
                    },
                    loadingFinished: function($loading, isBeyondMaxPage) {
                        $loading.css({
                            "position":"static",
                            "margin":"auto",
                            "top":"0",
                            "left":"0"
                        });
                        if (!isBeyondMaxPage) {
                            $loading.fadeOut();
                        } else {
                            $loading.remove();
                        }
                    },

                    loadingError: function($loading, $message, xhr) {
                        $loading.hide();
                        
                        switch (xhr) {
                            case 'error':
                                $message.html('加载失败，请重试~');
                                break;
                            case 'none':
                                $message.html('暂无数据，敬请期待~');
                                $message.css({
                                    "position":"absolute",
                                    "top":"10px",
                                    "left":"50%",
                                    "margin-left":"-20px"
                                });
                                break;
                            case 'end':
                                $message.html('已经没数据咯~');
                                break;
                        }

                        (xhr == 'end') && $message.fadeOut(2000);
                    }
                }
            });
        }

        self.afterLoad();
            
    },
    changeParams: function(params) {
        var self = this;

        $('#waterFall').html('');
        $('#waterfall-message').remove();
        $('#waterfall-loading').remove();

        self.waterfall.option(params);
        self.afterLoad();
    },
    afterLoad: function() {
        // 瀑布流加载后回调函数
        $('#waterFall').on('click', '.waterFall_item ', function() {
            nsLog({
                type: 8997
            });
        });
    }
};

module.exports = createWaterFall;