import React from 'react'
import Link from 'next/link'

export default () => (
	<section>
		<div className="ph3 ph5-ns pt5" id="style">
			<div className="mw9 center overflow-auto">
				<h3 className="f5 fw6 ttu tracked">Style Guide</h3>
				<p className="lh-copy measure">
				This is a quick introduction to some of the building blocks that Tachyons makes available. For a more in-depth look at design principles and how each module works, be sure to check out the <a className="link blue underline hover-navy" href="/docs" title="Tachyons docs">docs</a>
				</p>
				<h3 className="f6 ttu fw6 mb0 mt5 bb pb2">Typography</h3>
				<article className="dt-ns dt--fixed-ns">
					<div className="dtc-ns v-mid overflow-auto">
						<h1 className="f1 lh-title">Level 1 Heading</h1>
						<h2 className="f2 lh-title">Level 2 Heading</h2>
						<h3 className="f3 lh-title">Level 3 Heading</h3>
						<h4 className="f4 lh-title">Level 4 Heading</h4>
						<h5 className="f5 lh-title">Level 5 Heading</h5>
						<h6 className="f6 lh-title">Level 6 Heading</h6>
					</div>
				 <div className="dtc-ns v-mid">
					<pre className="ba b--black-05  pa2 overflow-auto">
						<code className="db f6 pa3 lh-copy" children={`
.f1 { font-size: 3rem; }
.f2 { font-size: 2.25rem; }
.f3 { font-size: 1.5rem; }
.f4 { font-size: 1.25rem; }
.f5 { font-size: 1rem; }
.f6 { font-size: .875rem; }
`} />
					</pre>
				</div>
			</article>
			<article className="mt5">
				<h3 className="f6 ttu fw6 mt0 mb3 bb pb2">Type Styles</h3>
				<div className="dt-ns dt--fixed-ns">
					<div className="dtc v-mid">
						<p className="i">Italicize: to write or print (text) in italics.</p>  
						<p className="b">Some text that needs to be super bold.</p>  
						<p className="underline">This text wants to be underlined.</p>  
						<p className="strike">This text should be crossed out.</p>  
						<p className="ttc">This text should be capitalized.</p>  
						<p className="ttu">This text should be uppercase.</p>  
					</div>
				<div className="dtc-ns v-mid">
					<pre className="ba b--black-05  pa2 overflow-auto">
						<code className="db f6 pa3 lh-copy" children={`
.i {         font-style: italic; }
.b {         font-weight: bold; }
.underline { text-decoration: underline; }
.strike {    text-decoration: line-through; }
.ttc {       text-transform: capitalize; }
.ttu {       text-transform: uppercase; }
`} />
					</pre>
				</div>
      </div>
    </article>
    <article className="mt5">
      <h3 className="f6 ttu fw6 mt0 mb3 bb pb2">Typefaces</h3>
      <div className="dt-ns dt--fixed-ns">
        <div className="dtc v-mid">
					<h4 className="f6 mb0 mt3">system serif</h4>
					<p className="serif">a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<h4 className="f6 mb0 mt3">Athelas</h4>
					<p className="athelas"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<p className="athelas ttu"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<h4 className="f6 mb0 mt3">georgia</h4>
					<p className="georgia"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<p className="georgia ttu"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<h4 className="f6 mb0 mt3">garamond</h4>
					<p className="garamond"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<p className="garamond ttu"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<h4 className="f6 mb0 mt3">baskerville</h4>
					<p className="baskerville"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<p className="baskerville ttu"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<h4 className="f6 mb0 mt3">calisto</h4>
					<p className="calisto"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<p className="calisto ttu"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<h4 className="f6 mb0 mt3">system sans-serif</h4>
					<p className="sans-serif"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<p className="sans-serif ttu"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<h4 className="f6 mb0 mt3">Helvetica</h4>
					<p className="helvetica"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<p className="helvetica ttu"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<h4 className="f6 mb0 mt3">Avenir Next</h4>
					<p className="avenir"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<p className="avenir ttu"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<h4 className="f6 mb0 mt3">Code</h4>
					<p className="code"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<p className="code ttu"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<h4 className="f6 mb0 mt3">Courier</h4>
					<p className="code"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
					<p className="code ttu"> a b c d e f g h i j k l m n o p q r s t u v w x y z</p>  
				</div>
				<div className="dtc-ns v-mid">
					<pre className="ba b--black-05  pa2 overflow-auto">
					<code className="db f6 pa3 lh-copy" children={`
.sans-serif {
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               ubuntu,
               roboto, noto,
               'segoe ui', arial,
               sans-serif;
}
.serif { font-family: georgia, times, serif; }
.code { font-family: Consolas, monaco, monospace; }
.courier { font-family: 'Courier Next', courier, monospace; }
.helvetica { font-family: 'helvetica neue', helvetica, sans-serif; }
.avenir { font-family: 'avenir next', avenir, sans-serif; }
.athelas { font-family: athelas, georgia, serif; }
.georgia { font-family: georgia, serif; } 
.times { font-family: times, serif; }
.bodoni { font-family: "Bodoni MT", serif; }
.calisto { font-family: "Calisto MT", serif; }
.garamond { font-family: garamond, serif; }
.baskerville { font-family: baskerville, serif; }
`} />
</pre>
    </div>
      </div>
    </article>
    <article className="mt5">
      <h3 className="f6 ttu fw6 mt0 mb3 bb pb2">Measure</h3>
      <div className="dt-ns dt--fixed-ns">
        <div className="dtc v-mid f6">
          <h4 className="mt4 fw6 f6">Wide Measure</h4>
          <p className="measure-wide lh-copy">
           Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet.
          </p>  
          <h4 className="mt4 fw6 f6">Measure</h4>
          <p className="measure lh-copy">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet.
          </p>  
          <h4 className="mt4 fw6 f6">Narrow Measure</h4>
          <p className="measure-narrow lh-copy">
             Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet.
          </p>  
      </div>
    <div className="dtc-ns v-mid">
<pre className="ba b--black-05  pa2 overflow-auto">
<code className="db f6 pa3 lh-copy" children={`
.measure-wide {   max-width: 34em; }
.measure {        max-width: 30em; }
.measure-narrow { max-width: 20em; }
`} />
</pre>
    </div>
      </div>
    </article>
</div>
</div>
    <article className="mt5" id="grids">
      <div className="ph3 ph5-ns">
        <div className="mw9 center">
          <h3 className="f6 ttu fw6 mt0 bb pb2">Grids</h3>
          <p className="lh-copy measure">
            Floats, widths, and padding can be combined to build a 
            wide variety of grids.
          </p>
        </div>
      </div>
      <section className="cf w-100 pv3 f6 ph3 ph4-ns">
          <div className="mw9 center ph3-ns">
            <div className="ph2-ns">
          <div className="fl w-100 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-100</code></div>
          </div>
          <div className="fl w-90 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-90</code></div>
          </div>
          <div className="fl w-10 pa2">
            <div className="outline bg-white tc pv4 truncate no-wrap"><code>fl w-10</code></div>
          </div>
          <div className="fl w-80 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-80</code></div>
          </div>
          <div className="fl w-20 pa2">
            <div className="outline bg-white tc pv4 truncate no-wrap"><code>fl w-20</code></div>
          </div>
          <div className="fl w-75 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-75</code></div>
          </div>
          <div className="fl w-25 pa2">
            <div className="outline bg-white tc pv4 truncate no-wrap"><code>fl w-25</code></div>
          </div>
          <div className="fl w-70 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-70</code></div>
          </div>
          <div className="fl w-30 pa2">
            <div className="outline bg-white tc pv4 truncate no-wrap"><code>fl w-30</code></div>
          </div>
          <div className="fl w-60 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-60</code></div>
          </div>
          <div className="fl w-40 pa2">
            <div className="outline bg-white tc pv4 truncate no-wrap"><code>fl w-40</code></div>
          </div>
          <div className="fl w-50 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-50</code></div>
          </div>
          <div className="fl w-50 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-50</code></div>
          </div>
          <div className="fl w-third pa2">
            <div className="outline bg-white tc pv4"><code>fl w-third</code></div>
          </div>
          <div className="fl w-third pa2">
            <div className="outline bg-white tc pv4"><code>fl w-third</code></div>
          </div>
          <div className="fl w-third pa2">
            <div className="outline bg-white tc pv4"><code>fl w-third</code></div>
          </div>
          <div className="fl w-third pa2">
            <div className="outline bg-white tc pv4 truncate w-100 no-wrap"><code>fl w-third</code></div>
          </div>
          <div className="fl w-two-thirds pa2">
            <div className="outline bg-white tc pv4 truncate w-100 no-wrap"><code>fl w-two-thirds</code></div>
          </div>
          <div className="fl w-25 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-25</code></div>
          </div>
          <div className="fl w-25 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-25 </code></div>
          </div>
          <div className="fl w-25 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-25 </code></div>
          </div>
          <div className="fl w-25 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-25 </code></div>
          </div>
          <div className="fl w-20 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-20 </code></div>
          </div>
          <div className="fl w-20 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-20 </code></div>
          </div>
          <div className="fl w-20 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-20 </code></div>
          </div>
          <div className="fl w-20 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-20 </code></div>
          </div>
          <div className="fl w-20 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-20 </code></div>
          </div>
          <div className="fl w-10 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-10 </code></div>
          </div>
          <div className="fl w-10 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-10 </code></div>
          </div>
          <div className="fl w-10 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-10 </code></div>
          </div>
          <div className="fl w-10 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-10 </code></div>
          </div>
          <div className="fl w-10 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-10 </code></div>
          </div>
          <div className="fl w-10 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-10 </code></div>
          </div>
          <div className="fl w-10 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-10 </code></div>
          </div>
          <div className="fl w-10 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-10 </code></div>
          </div>
          <div className="fl w-10 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-10 </code></div>
          </div>
          <div className="fl w-10 pa2">
            <div className="outline bg-white tc pv4"><code>fl w-10 </code></div>
          </div>
        </div>
      </div>
    </section>
  </article>
  <div className="ph3 ph5-ns pt5">
  <div className="mw9 center overflow-auto">
    <article className="mt5">
      <h3 className="f6 ttu fw6 mt0 mb3 bb pb2">Colors</h3>
      <div className="dt-ns dt--fixed-ns">
        <div className="dtc-ns v-mid pr4-ns">
<table className="border-collapse w-100" cellspacing="0" cellpadding="0">
<tbody className="black-60 f6">
<tr><td className="bb b--black-05 bg-dark-red pa4"></td><td className="bb b--black-05 ph4 f4 b dark-red">Aa</td><td className="bb b--black-05">--dark-red:  #e7040f;</td></tr>
<tr><td className="bb b--black-05 bg-red pa4 "></td><td className="bb b--black-05 ph4 f4 b red">Aa</td><td className="bb b--black-05">--red:  #ff4136;</td></tr>
<tr><td className="bb b--black-05 bg-light-red pa4 "></td><td className="bb b--black-05 ph4 f4 b light-red">Aa</td><td className="bb b--black-05">--light-red:  #ff725c;</td></tr>
<tr><td className="bb b--black-05 bg-orange pa4 "></td><td className="bb b--black-05 ph4 f4 b orange">Aa</td><td className="bb b--black-05">--orange:  #ff6300;</td></tr>
<tr><td className="bb b--black-05 bg-gold pa4 "></td><td className="bb b--black-05 ph4 f4 b gold">Aa</td><td className="bb b--black-05">--gold:  #ffb700;</td></tr>
<tr><td className="bb b--black-05 bg-yellow pa4 "></td><td className="bb b--black-05 ph4 f4 b yellow">Aa</td><td className="bb b--black-05">--yellow:  #ffde37;</td></tr>
<tr><td className="bb b--black-05 bg-light-yellow pa4 "></td><td className="bb b--black-05 ph4 f4 b light-yellow">Aa</td><td className="bb b--black-05">--light-yellow:  #fbf1a9;</td></tr>
<tr><td className="bb b--black-05 bg-purple pa4 "></td><td className="bb b--black-05 ph4 f4 b purple">Aa</td><td className="bb b--black-05">--purple:  #5e2ca5;</td></tr>
<tr><td className="bb b--black-05 bg-light-purple pa4 "></td><td className="bb b--black-05 ph4 f4 b light-purple">Aa</td><td className="bb b--black-05">--light-purple:  #a463f2;</td></tr>
<tr><td className="bb b--black-05 bg-dark-pink pa4 "></td><td className="bb b--black-05 ph4 f4 b dark-pink">Aa</td><td className="bb b--black-05">--dark-pink:  #d5008f;</td></tr>
<tr><td className="bb b--black-05 bg-hot-pink pa4 "></td><td className="bb b--black-05 ph4 f4 b hot-pink">Aa</td><td className="bb b--black-05">--hot-pink: #ff41b4;</td></tr>
<tr><td className="bb b--black-05 bg-pink pa4 "></td><td className="bb b--black-05 ph4 f4 b pink">Aa</td><td className="bb b--black-05">--pink:  #ff80cc;</td></tr>
<tr><td className="bb b--black-05 bg-light-pink pa4 "></td><td className="bb b--black-05 ph4 f4 b light-pink">Aa</td><td className="bb b--black-05">--light-pink:  #ffa3d7;</td></tr>
<tr><td className="bb b--black-05 bg-dark-green pa4 "></td><td className="bb b--black-05 ph4 f4 b dark-green">Aa</td><td className="bb b--black-05">--dark-green:  #137752;</td></tr>
<tr><td className="bb b--black-05 bg-green pa4 "></td><td className="bb b--black-05 ph4 f4 b green">Aa</td><td className="bb b--black-05">--green:  #19a974;</td></tr>
<tr><td className="bb b--black-05 bg-light-green pa4 "></td><td className="bb b--black-05 ph4 f4 b light-green">Aa</td><td className="bb b--black-05">--light-green:  #9eebcf;</td></tr>
<tr><td className="bb b--black-05 bg-navy pa4 "></td><td className="bb b--black-05 ph4 f4 b navy">Aa</td><td className="bb b--black-05">--navy:  #001b44;</td></tr>
<tr><td className="bb b--black-05 bg-dark-blue pa4 "></td><td className="bb b--black-05 ph4 f4 b dark-blue">Aa</td><td className="bb b--black-05">--dark-blue:  #00449e;</td></tr>
<tr><td className="bb b--black-05 bg-blue pa4 "></td><td className="bb b--black-05 ph4 f4 b blue">Aa</td><td className="bb b--black-05">--blue:  #357edd;</td></tr>
<tr><td className="bb b--black-05 bg-light-blue pa4 "></td><td className="bb b--black-05 ph4 f4 b light-blue">Aa</td><td className="bb b--black-05">--light-blue:  #96ccff;</td></tr>
<tr><td className="bb b--black-05 bg-lightest-blue pa4 "></td><td className="bb b--black-05 ph4 f4 b lightest-blue">Aa</td><td className="bb b--black-05">--lightest-blue:  #cdecff;</td></tr>
<tr><td className="bb b--black-05 bg-washed-blue pa4 "></td><td className="bb b--black-05 ph4 f4 b washed-blue">Aa</td><td className="bb b--black-05">--washed-blue:  #f6fffe;</td></tr>
<tr><td className="bb b--black-05 bg-washed-green pa4 "></td><td className="bb b--black-05 ph4 f4 b washed-green">Aa</td><td className="bb b--black-05">--washed-green:  #e8fdf5;</td></tr>
<tr><td className="bb b--black-05 bg-washed-yellow pa4 "></td><td className="bb b--black-05 ph4 f4 b washed-yellow">Aa</td><td className="bb b--black-05">--washed-yellow:  #fffceb;</td></tr>
<tr><td className="bb b--black-05 bg-washed-red pa4 "></td><td className="bb b--black-05 ph4 f4 b washed-red">Aa</td><td className="bb b--black-05">--washed-red:  #ffdfdf;</td></tr>
</tbody>
</table>

        </div>
        <div className="dtc-ns v-mid">
<pre className="ba b--black-05 pa2 overflow-auto">
<code className="db f6 ph3 lh-copy" children={`
.bg-dark-red { background-color: var(--dark-red); }
.bg-red { background-color: var(--red); }
.bg-orange { background-color: var(--orange); }
.bg-gold { background-color: var(--gold); }
.bg-yellow { background-color: var(--yellow); }
.bg-purple { background-color: var(--purple); }
.bg-light-purple { background-color: var(--light-purple); }
.bg-hot-pink { background-color:  var(--hot-pink); }
.bg-dark-pink { background-color: var(--dark-pink); }
.bg-pink { background-color: var(--pink); }
.bg-dark-green { background-color: var(--dark-green); }
.bg-green { background-color: var(--green); }
.bg-navy { background-color: var(--navy); }
.bg-dark-blue { background-color: var(--dark-blue); }
.bg-blue { background-color: var(--blue); }
.bg-light-blue { background-color: var(--light-blue); }
.bg-lightest-blue { background-color: var(--lightest-blue); }
.bg-washed-blue { background-color: var(--washed-blue); }
.bg-washed-green { background-color: var(--washed-green); }
.bg-washed-yellow { background-color: var(--washed-yellow); }
.bg-light-pink { background-color: var(--light-pink); }
.bg-light-yellow { background-color: var(--light-yellow); }
.bg-light-red { background-color: var(--light-red); }

.dark-red { color: var(--dark-red); }
.red { color: var(--red); }
.orange { color: var(--orange); }
.gold { color: var(--gold); }
.yellow { color: var(--yellow); }
.purple { color: var(--purple); }
.light-purple { color: var(--light-purple); }
.hot-pink { color:  var(--hot-pink); }
.dark-pink { color: var(--dark-pink); }
.pink { color: var(--pink); }
.dark-green { color: var(--dark-green); }
.green { color: var(--green); }
.navy { color: var(--navy); }
.dark-blue { color: var(--dark-blue); }
.blue { color: var(--blue); }
.light-blue { color: var(--light-blue); }
.lightest-blue { color: var(--lightest-blue); }
.washed-blue { color: var(--washed-blue); }
.washed-green { color: var(--washed-green); }
.washed-yellow { color: var(--washed-yellow); }
.light-pink { color: var(--light-pink); }
.light-yellow { color: var(--light-yellow); }
.light-red { color: var(--light-red); }
`} />
</pre>
    </div>
      </div>
    </article>
    <article className="mt5">
      <h3 className="f6 ttu fw6 mt0 mb3 bb pb2">Borders</h3>
      <div className="dt-ns dt--fixed-ns">
        <div className="dtc-ns v-mid">
          <div className="ba db mw5 pa3 bg-black-025 mb3 bg-near-white">ba = border on all sides</div>
          <div className="bt db mw5 pa3 bg-black-025 mb3 bg-near-white">bt = border top</div>
          <div className="br db mw5 pa3 bg-black-025 mb3 bg-near-white">br = border right</div>
          <div className="bb db mw5 pa3 bg-black-025 mb3 bg-near-white">bb = border bottom</div>
          <div className="bl db mw5 pa3 bg-black-025 mb3 bg-near-white">bl = border left</div>
          <div className="bn db mw5 pa3 bg-black-025 mb3 bg-near-white">bn = border none</div>
        </div>
        <div className="dtc-ns v-mid">
<pre className="ba b--black-05  pa2 overflow-auto">
<code className="db f6 pa3 lh-copy" children={`	
  .ba { border-style: solid; border-width: 1px; }
  .bt { border-top-style: solid; border-top-width: 1px; }
  .br { border-right-style: solid; border-right-width: 1px; }
  .bb { border-bottom-style: solid; border-bottom-width: 1px; }
  .bl { border-left-style: solid; border-left-width: 1px; }
  .bn { border-style: none; border-width: 0; }
`} />
</pre>
    </div>
      </div>
    </article>
    <article className="mt5">
      <h3 className="f6 ttu fw6 mt0 mb3 bb pb2">Border Styles</h3>
      <div className="dt-ns dt--fixed-ns">
        <div className="dtc-ns v-mid">
          <div className="ba b--dotted db mw5 pa3 mb3 ">dotted</div>
          <div className="ba b--dashed db mw5 pa3 mb3 ">dashed</div>
          <div className="ba b--solid db mw5 pa3 mb3 ">solid</div>
          <div className="ba b--none db mw5 pa3 mb3 ">none</div>
        </div>
        <div className="dtc-ns v-mid">
<pre className="ba b--black-05  pa2 overflow-auto">
<code className="db f6 pa3 lh-copy" children={`
.b--dotted { border-style: dotted; }
.b--dashed { border-style: dashed; }
.b--solid {  border-style: solid; }
.b--none {   border-style: none; }
`} />
</pre>
    </div>
      </div>
    </article>
    <article className="mt5">
      <h3 className="f6 ttu fw6 mt0 mb3 bb pb2">Border Widths</h3>
      <div className="dt-ns dt--fixed-ns">
        <div className="dtc-ns v-mid">
          <div className="bt db mw5 mb4 bg-near-white">default</div>
          <div className="bt bw1 db mw5 mb4 bg-near-white">.125rem</div>
          <div className="bt bw2 db mw5 mb4 bg-near-white">.25rem</div>
          <div className="bt bw3 db mw5 mb4 bg-near-white">.5rem</div>
          <div className="bt bw4 db mw5 mb4 bg-near-white">1rem</div>
          <div className="bt bw5 db mw5 mb4 bg-near-white">2rem</div>
        </div>
        <div className="dtc-ns v-mid">
<pre className="ba b--black-05  pa2 overflow-auto">
<code className="db f6 pa3 lh-copy" children={`	
.bw0 { border-width: 0; }
.bw1 { border-width: .125rem; }
.bw2 { border-width: .25rem; }
.bw3 { border-width: .5rem; }
.bw4 { border-width: 1rem; }
.bw5 { border-width: 2rem; }
`} />
</pre>
    </div>
      </div>
    </article>
    <article className="mt5">
      <h3 className="f6 ttu fw6 mt0 mb3 bb pb2">Border Colors</h3>
      <div className="dt-ns dt--fixed-ns">
        <div className="dtc-ns v-mid pr4">

<div className="bt black b--black db pt2 pb2 mb3">b--black</div>
<div className="bt black-90 b--black-90 db pt2 pb2 mb3">b--black-90</div>
<div className="bt black-80 b--black-80 db pt2 pb2 mb3">b--black-80</div>
<div className="bt black-70 b--black-70 db pt2 pb2 mb3">b--black-70</div>
<div className="bt black-60 b--black-60 db pt2 pb2 mb3">b--black-60</div>
<div className="bt black-50 b--black-50 db pt2 pb2 mb3">b--black-50</div>
<div className="bt black-40 b--black-40 db pt2 pb2 mb3">b--black-40</div>
<div className="bt black-30 b--black-30 db pt2 pb2 mb3">b--black-30</div>
<div className="bt black-20 b--black-20 db pt2 pb2 mb3">b--black-20</div>
<div className="bt black-10 b--black-10 db pt2 pb2 mb3">b--black-10</div>
<div className="bt black-05 b--black-05 db pt2 pb2 mb3">b--black-05</div>
<div className="bt black-025 b--black-025 db pt2 pb2 mb3">b--black-025</div>
<div className="bt black-0125 b--black-0125 db pt2 pb2 mb3">b--black-0125</div>
<div className="bt near-black b--near-black db pt2 pb2 mb3">b--near-black</div>
<div className="bt dark-gray b--dark-gray db pt2 pb2 mb3">b--dark-gray</div>
<div className="bt mid-gray b--mid-gray db pt2 pb2 mb3">b--mid-gray</div>
<div className="bt gray b--gray db pt2 pb2 mb3">b--gray</div>
<div className="bg-black pa2 db">
<div className="bt silver silver b--silver db pt2 pb2 mb3">b--silver</div>
<div className="bt light-silver b--light-silver db pt2 pb2 mb3">b--light-silver</div>
<div className="bt light-gray b--light-gray db pt2 pb2 mb3">b--light-gray</div>
<div className="bt near-white b--near-white db pt2 pb2 mb3">b--near-white</div>
<div className="bt white b--white db pt2 pb2 mb3">b--white</div>
<div className="bt white-90 b--white-90 db pt2 pb2 mb3">b--white-90</div>
<div className="bt white-80 b--white-80 db pt2 pb2 mb3">b--white-80</div>
<div className="bt white-70 b--white-70 db pt2 pb2 mb3">b--white-70</div>
<div className="bt white-60 b--white-60 db pt2 pb2 mb3">b--white-60</div>
<div className="bt white-50 b--white-50 db pt2 pb2 mb3">b--white-50</div>
<div className="bt white-40 b--white-40 db pt2 pb2 mb3">b--white-40</div>
<div className="bt white-30 b--white-30 db pt2 pb2 mb3">b--white-30</div>
<div className="bt white-20 b--white-20 db pt2 pb2 mb3">b--white-20</div>
<div className="bt white-10 b--white-10 db pt2 pb2 mb3">b--white-10</div>
<div className="bt white-05 b--white-05 db pt2 pb2 mb3">b--white-05</div>
<div className="bt white-025 b--white-025 db pt2 pb2 mb3">b--white-025</div>
<div className="bt white-0125 b--white-0125 db pt2 pb2 mb3">b--white-0125</div>
<div className="bt dark-red b--dark-red db pt2 pb2 mb3">b--dark-red</div>
<div className="bt red b--red db pt2 pb2 mb3">b--red</div>
<div className="bt orange b--orange db pt2 pb2 mb3">b--orange</div>
<div className="bt gold b--gold db pt2 pb2 mb3">b--gold</div>
<div className="bt yellow b--yellow db pt2 pb2 mb3">b--yellow</div>
<div className="bt purple b--purple db pt2 pb2 mb3">b--purple</div>
<div className="bt light-purple b--light-purple db pt2 pb2 mb3">b--light-purple</div>
<div className="bt hot-pink b--hot-pink db pt2 pb2 mb3">b--hot-pink</div>
<div className="bt dark-pink b--dark-pink db pt2 pb2 mb3">b--dark-pink</div>
<div className="bt pink b--pink db pt2 pb2 mb3">b--pink</div>
<div className="bt dark-green b--dark-green db pt2 pb2 mb3">b--dark-green</div>
<div className="bt green b--green db pt2 pb2 mb3">b--green</div>
<div className="bt navy b--navy db pt2 pb2 mb3">b--navy</div>
<div className="bt dark-blue b--dark-blue db pt2 pb2 mb3">b--dark-blue</div>
<div className="bt blue b--blue db pt2 pb2 mb3">b--blue</div>
<div className="bt light-blue b--light-blue db pt2 pb2 mb3">b--light-blue</div>
<div className="bt lightest-blue b--lightest-blue db pt2 pb2 mb3">b--lightest-blue</div>
<div className="bt washed-blue b--washed-blue db pt2 pb2 mb3">b--washed-blue</div>
<div className="bt washed-green b--washed-green db pt2 pb2 mb3">b--washed-green</div>
<div className="bt washed-yellow b--washed-yellow db pt2 pb2 mb3">b--washed-yellow</div>
<div className="bt light-pink b--light-pink db pt2 pb2 mb3">b--light-pink</div>
<div className="bt light-yellow b--light-yellow db pt2 pb2 mb3">b--light-yellow</div>
<div className="bt light-red b--light-red db pt2 pb2 mb3">b--light-red</div>
<div className="bt transparent b--transparent db pt2 pb2 mb3">b--transparent</div>
</div>
        </div>
        <div className="dtc-ns v-mid">
<pre className="ba b--black-05  pa2 overflow-auto">
<code className="db f6 pa3 lh-copy" children={`
.b--black {        border-color: var(--black); }
.b--black-90 {   border-color: var(--black-90); }
.b--black-80 {   border-color: var(--black-80); }
.b--black-70 {   border-color: var(--black-70); }
.b--black-60 {   border-color: var(--black-60); }
.b--black-50 {   border-color: var(--black-50); }
.b--black-40 {   border-color: var(--black-40); }
.b--black-30 {   border-color: var(--black-30); }
.b--black-20 {   border-color: var(--black-20); }
.b--black-10 {   border-color: var(--black-10); }
.b--black-05 {   border-color: var(--black-05); }
.b--black-025 {   border-color: var(--black-025); }
.b--black-0125 {   border-color: var(--black-0125); }
.b--near-black {   border-color: var(--near-black); }
.b--dark-gray {    border-color: var(--dark-gray); }
.b--mid-gray {     border-color: var(--mid-gray); }
.b--gray {         border-color: var(--gray); }
.b--silver {       border-color: var(--silver); }
.b--light-silver { border-color: var(--light-silver); }
.b--light-gray {   border-color: var(--light-gray); }
.b--near-white {   border-color: var(--near-white); }
.b--white {        border-color: var(--white); }
.b--white-90 {   border-color: var(--white-90); }
.b--white-80 {   border-color: var(--white-80); }
.b--white-70 {   border-color: var(--white-70); }
.b--white-60 {   border-color: var(--white-60); }
.b--white-50 {   border-color: var(--white-50); }
.b--white-40 {   border-color: var(--white-40); }
.b--white-30 {   border-color: var(--white-30); }
.b--white-20 {   border-color: var(--white-20); }
.b--white-10 {   border-color: var(--white-10); }
.b--white-05 {   border-color: var(--white-05); }
.b--white-025 {   border-color: var(--white-025); }
.b--white-0125 {   border-color: var(--white-0125); }
.b--dark-red { border-color:  var(--dark-red); }
.b--red { border-color:  var(--red); }
.b--orange { border-color:  var(--orange); }
.b--gold { border-color:  var(--gold); }
.b--yellow { border-color:  var(--yellow); }
.b--purple { border-color:  var(--purple); }
.b--light-purple { border-color:  var(--light-purple); }
.b--hot-pink { border-color:  var(--hot-pink); }
.b--dark-pink { border-color:  var(--dark-pink); }
.b--pink { border-color:  var(--pink); }
.b--dark-green { border-color:  var(--dark-green); }
.b--green { border-color:  var(--green); }
.b--navy { border-color:  var(--navy); }
.b--dark-blue { border-color:  var(--dark-blue); }
.b--blue { border-color:  var(--blue); }
.b--light-blue { border-color:  var(--light-blue); }
.b--lightest-blue { border-color:  var(--lightest-blue); }
.b--washed-blue { border-color:  var(--washed-blue); }
.b--washed-green { border-color:  var(--washed-green); }
.b--washed-yellow { border-color:  var(--washed-yellow); }
.b--light-pink { border-color:  var(--light-pink); }
.b--light-yellow { border-color:  var(--light-yellow) }
.b--light-red { border-color:  var(--light-red); }
.b--transparent { border-color: var(--transparent); }
`} />
</pre>
    </div>
      </div>
    </article>
    <article className="mt5">
      <h3 className="f6 ttu fw6 mt0 mb3 bb pb2">Border Radii</h3>
      <div className="dt-ns dt--fixed-ns">
        <div className="dtc-ns v-mid">
          <div className="ba dib ph4 pv3 mb4  br1">br1</div>
          <div className="ba dib ph4 pv3 mb4  br2">br2</div>
          <div className="ba dib ph4 pv3 mb4  br3">br3</div>
          <div className="ba dib ph4 pv3 mb4  br4">br4</div><br />
<div className="dt dt--fixed">
          <div className="dtc v-mid"><div className="ba dib mb4 br-100 h3 w3 pa4 tc"></div></div>
          <div className="dtc v-mid"><div className="ba dib mb4 ph4 pv3  br-pill">pill</div></div>
</div>
          
          <div className="ba br--bottom dib ph4 pv3 mb4 br3">br--bottom</div>
          <div className="ba br--top dib ph4 pv3 mb4 br3">br--top</div><br />
          <div className="ba br--left dib ph4 pv3 mb4 br3">br--left</div>
          <div className="ba br--right dib ph4 pv3 mb4 br3">br--right</div>
        </div>
        <div className="dtc-ns v-mid">
<pre className="ba b--black-05  pa2 overflow-auto">
<code className="db f6 pa3 lh-copy" children={`
.br0 {        border-radius: 0; }
.br1 {        border-radius: .125rem; }
.br2 {        border-radius: .25rem; }
.br3 {        border-radius: .5rem; }
.br4 {        border-radius: 1rem; }
.br-100 {     border-radius: 100%; }
.br-pill {    border-radius: 9999px; }
.br--bottom {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.br--top {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.br--right {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.br--left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
`} />
</pre>
    </div>
      </div>
    </article>
    <article className="mt5">
      <h3 className="f6 ttu fw6 mt0 mb3 bb pb2">Hover Animations</h3>
      <div className="dt-ns dt--fixed-ns">
        <div className="dtc-ns v-mid pr4-ns">
        <div className="pa3 bg-black mb3 white grow pointer">Grow</div>
        <div className="pa3 bg-black mb3 white dim pointer">Dim</div>
        </div>
        <div className="dtc-ns v-mid">
<pre className="ba b--black-05  pa2 overflow-auto">
<code className="db f6 pa3 lh-copy" children={`
.grow {
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
}

.grow:hover,
.grow:focus {
  transform: scale(1.05);
}

.dim {
  opacity: 1;
  transition: opacity .15s ease-in;
}
.dim:hover,
.dim:focus {
  opacity: .5;
  transition: opacity .15s ease-in;
}
`} />
</pre>
    </div>
      </div>
    </article>
  </div>
</div>
</section>
)
