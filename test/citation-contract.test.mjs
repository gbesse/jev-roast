import test from 'node:test';import assert from 'node:assert/strict';import {roast,validatePack} from '../src/index.mjs';
const pack={id:'test',title:'Test',dimensions:[{id:'clear',label:'Clear',type:'noul',instructions:'Clear?',weight:1,weak_below:.5}]};
test('bad threshold blocks before semantic calls',async()=>{let calls=0;await assert.rejects(roast({text:'Text.',pack:{...pack,dimensions:[{...pack.dimensions[0],weak_below:2}]},provider:async()=>{calls++;}}));assert.equal(calls,0);});
test('invalid first-pass values and invented citations cannot become a silent missing finding',async()=>{
 await assert.rejects(roast({text:'Text.',pack,provider:async()=>({answers:{clear:{type:'noul',noul:NaN}}})}),/out of contract/);
 let calls=0;await assert.rejects(roast({text:'Text.',pack,provider:async()=>{calls++;return calls===1?{answers:{clear:{type:'noul',noul:.1}},usage:{input_tokens:1}}:{answers:{clear:{type:'choice',choice:'invented'}},usage:{input_tokens:1}};}}),/outside selected spans/);
});
