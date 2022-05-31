package com.kjb.uixs.ia;

import java.util.List;
import java.util.Map;

import com.kjb.uixs.SqlMapper;

@SqlMapper
public interface IaMapper {
	public List<IaVO> iaList();
	
	/**
	 * 요청작업 메뉴 경로 검색
	 * */
	public List<Map<String, String>> selectIaPath(String[] request_ias);
	
	public List<IaVO> selectRequestIa(String[] request_ias);
	
	public List<IaVO> selectIaTree(IaVO iaVo);
	
	/**
	 * ia 상세 조회
	 * @param iaVo
	 * @return
	 */
	public IaVO selectIaOne(IaVO iaVo);
	
	/**
	 * 화면목록 조회
	 * @param iaVo
	 * @return
	 */
	public List<IaVO> selectIaTreeForView(IaVO iaVo);
	
	/**
	 * 화면목록 - 화면 경로 를 포함하여 조회
	 * @param iaVo
	 * @return
	 */
	public List<IaVO> selectIaTreeForView2(IaVO iaVo);
	
	public void insertIaTree(IaVO iaVo);
	
	public void updateIaTree(IaVO iaVo);
	
	public void deleteIaTree(String id);
	
	public int selectMaxSort(IaVO iaVO);
	
	public void updateIaSort(IaVO iaVo);
	
	/**
	 * 메뉴에 요청한 작업목록 history
	 * @param param
	 * @return
	 */
	public List<Map<String, Object>> selectRequestWorkForIa(Map<String, String> param);
}
