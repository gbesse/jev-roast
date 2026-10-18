import test from 'node:test';import assert from 'node:assert/strict';import {roast,validatePack} from '../src/index.mjs';
const pack={id:'test',title:'Test',dimensions:[{id:'clear',label:'Clear',type:'noul',instructions:'Clear?',weight:1,weak_below:.5}]};
test('bad threshold blocks before semantic calls',async()=>{let calls=0;await assert.rejects(roast({text:'Text.',pack:{...pack,dimensions:[{...pack.dimensions[0],weak_below:2}]},provider:async()=>{calls++;}}));assert.equal(calls,0);});
test('invalid first-pass values and invented citations cannot become a silent missing finding',async()=>{
 await assert.rejects(roast({text:'Text.',pack,provider:async()=>({answers:{clear:{type:'noul',noul:NaN}}})}),/out of contract/);
 let calls=0;await assert.rejects(roast({text:'Text.',pack,provider:async()=>{calls++;return calls===1?{answers:{clear:{type:'noul',noul:.1}},usage:{input_tokens:1}}:{answers:{clear:{type:'choice',choice:'invented'}},usage:{input_tokens:1}};}}),/outside selected spans/);
});


test('later provider work cannot rewrite first-pass critique or accounting',async()=>{
 const first={model:'synthetic',answers:{clear:{type:'noul',noul:.1}},usage:{input_tokens:7}};let calls=0;
 const report=await roast({text:'Text.',pack,provider:async()=>{if(++calls===1)return first;first.answers.clear.noul=1;first.usage.input_tokens=999;return {answers:{clear:{type:'choice',choice:'s1'}},usage:{input_tokens:3}};}});
 assert.equal(report.score,.1);assert.equal(report.dimensions.clear.noul,.1);assert.equal(report.usage.input_tokens,10);assert.equal(report.citations.clear.text,'Text.');
});
test('prototype-like dimension citations remain owned and survive JSON export',async()=>{
 const input={...pack,dimensions:[{...pack.dimensions[0],id:'__proto__'}]};let calls=0;
 const report=await roast({text:'Text.',pack:input,provider:async()=>({answers:Object.fromEntries([['__proto__',++calls===1?{type:'noul',noul:.1}:{type:'choice',choice:'s1'}]]),usage:{input_tokens:1}})});
 assert.ok(Object.hasOwn(report.citations,'__proto__'));assert.equal(JSON.parse(JSON.stringify(report)).citations.__proto__.text,'Text.');
});
test('citation response must be a choice even if an allowed span ID is present',async()=>{
 let calls=0;await assert.rejects(roast({text:'Text.',pack,provider:async()=>({answers:{clear:++calls===1?{type:'noul',noul:.1}:{type:'noul',choice:'s1',noul:.9}},usage:{input_tokens:1}})}),/Citation outside/);
});
